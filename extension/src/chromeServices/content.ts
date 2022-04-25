
import { BackgroundMessage, BackgroundMessageType, ClientMessageGetWords, ClientMessageType, Word } from '../types';

if(window.location.host === "localhost:3000") throw new Error("Wordi site")

if(!["http:", "https:"].includes(window.location.protocol)) throw new Error("Wrong protocol")

class Searcher {
    styleUUID: string
    observer: MutationObserver

    xpath = ""
    regexp = new RegExp("")
    words: Word[] = []

    constructor() {
        this.styleUUID = Math.random().toString(36).substring(2)

        this.observer = new MutationObserver((mutations) => {
            for (const mut of mutations) {
                switch(mut.type) {
                    case "childList":
                        for (const node of mut.addedNodes)
                            this.search(node)
                        break
                    case "characterData":
                         break
                        
                }
            }
        })

        this.insertStyles()
        this.subscribe()
    }

    insertStyles() {
        document.head.insertAdjacentHTML("beforeend", `<style>
            .wordi-highlight-word-${this.styleUUID} { visibility: hidden; }
            .wordi-highlight-${this.styleUUID} { position: absolute; background-color: red; opacity: 0.2; user-select: none; transform: translateX(-100%) }
            .wordi-overflow-fix-${this.styleUUID} { position: relative; overflow: hidden }
            .wordi-tooltip-${this.styleUUID} { position: absolute; z-index: 10000; transition: opacity 300ms ease, transform 500ms ease;opacity: 0; pointer-events: none; user-select: none;
                margin-top: -5px; color: #2A3A50; transform: translateX(-50%); font: caption }
            .wordi-tooltip-flex-${this.styleUUID} { display: flex; column-gap: 5px; }
            .wordi-tooltip-flex-${this.styleUUID} > span { background-color: white; border-radius: 20px; padding: 8px 10px; box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%); } 
            .wordi-container-${this.styleUUID}:hover > .wordi-tooltip-${this.styleUUID} { transform: translateX(10px); opacity: 1 }
            .wordi-container-${this.styleUUID} { white-space: nowrap }
        </style>`)
    }

    static updateProcessedWords(el: any, word: string) {
        //if(!el.wordi) el.wordi = []
        //el.wordi.push(word)
    }

    static updateProcessedElement(el: any) {
        el.wordi = true
    }

    search(where: Node) {
        if (!(where as any).outerText?.match(this.regexp)) return

        var xpathResult = document.evaluate(this.xpath, where, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE)
    
        const elements = Array.from({
            [Symbol.iterator]() {
                return {
                    next: () => {
                        let node = xpathResult.iterateNext()
                        return {
                            value: node,
                            done: !node
                        };
                    }
                }
            }
        });
    
        console.log("xpath res", elements)
    
        for (const el of elements) {
            if((el as any)?.wordi === true) continue

            let initialText = el?.textContent || ""
    
            let cutLength = 0
            let restTextNode = el
            
            let match
            // eslint-disable-next-line no-cond-assign
            while (match = this.regexp.exec(initialText)) {
                const matchedWord = match.groups?.word || ""
                const matchedWordLowered = matchedWord.toLocaleLowerCase()

                //if((el as any).wordi === true/* || (el as any).wordi?.includes(matchedWordLowered)*/) continue
                //Searcher.updateProcessedWords(el, matchedWordLowered)
                
                const wordTextNode = (restTextNode as any)?.splitText(match.index - cutLength)
                Searcher.updateProcessedElement(wordTextNode)
                restTextNode = wordTextNode.splitText(matchedWord.length)

                cutLength = match.index + matchedWord.length
    
                const highlightWordText = document.createTextNode(matchedWord)
                Searcher.updateProcessedElement(highlightWordText)
    
                const highlightWord = document.createElement("span");
                highlightWord.className = `wordi-highlight-word-${this.styleUUID}`;
                
                const highlight = document.createElement("span");
                highlight.className = `wordi-highlight-${this.styleUUID}`;
            
                const tooltip = document.createElement("span");
                tooltip.className = `wordi-tooltip-${this.styleUUID}`;
    
                const tooltipFlex = document.createElement("span");
                tooltipFlex.className = `wordi-tooltip-flex-${this.styleUUID}`;
    
                for(const translationWord of this.words.find(({ word }) => word.toLowerCase() === matchedWordLowered)?.translations || []) {
                    const translation = document.createElement("span");
                    translation.innerText = translationWord
                    tooltipFlex.appendChild(translation)
                }
    
                const overflowFix = document.createElement("span");
                overflowFix.className = `wordi-overflow-fix-${this.styleUUID}`;
    
    
                const wordiContainer = document.createElement("span")
                wordiContainer.className = `wordi-container-${this.styleUUID}`;
                
    
                highlightWord.appendChild(highlightWordText)
                highlight.appendChild(highlightWord)
                overflowFix.appendChild(highlight)
                tooltip.appendChild(tooltipFlex)
                wordiContainer.appendChild(tooltip)
                wordiContainer.appendChild(overflowFix)
    
                restTextNode?.parentNode?.insertBefore(wordiContainer, restTextNode)
    
            }
        }
    }

    updateWords(words: Word[]) {
        if(words.length === 0) return

        this.words = words
        const wordsStrings = words.map(({ word }) => word.toLowerCase())
        this.xpath = `(.//text())[not(parent::script) and not(parent::noscript) and not(parent::style)][${wordsStrings.map(word => `contains(translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"),${JSON.stringify(word)})`).join(" or ")}]`
        this.regexp = new RegExp(`\\b(?<word>${wordsStrings.join("|")})\\b`, "ig")
    }

    subscribe() {
        this.observer.observe(document, {
            subtree: true,
            childList: true,
            characterData: true
        })
    }
}


const searcher = new Searcher()

chrome.runtime.onMessage.addListener((msg: BackgroundMessage, sender: chrome.runtime.MessageSender, sendResponse) => {
    console.log('[content.js]. Message received', msg);

    sendResponse()

    switch(msg.type) {
        case BackgroundMessageType.UpdateUser:
            console.log("new user", msg.user)
            break
        case BackgroundMessageType.UpdateWords: 
            console.log("new words", msg.words)

            searcher.updateWords(msg.words || [])
            searcher.search(document.body)
            break
    }
});

chrome.runtime.sendMessage<ClientMessageGetWords>({ type: ClientMessageType.GetWords })


