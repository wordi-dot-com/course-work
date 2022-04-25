import {Badge, Card, CardActionArea, CardContent, Container, Typography} from "@mui/material";

interface MagazineProps {
    title: string,
    content: string
}

export default function ({title, content} : MagazineProps) {
    return (
        <Card raised sx={{ borderRadius: 5 }}>
            <CardActionArea>
                <Container>
                    <CardContent>
                        <Badge color="primary" badgeContent=" " variant="dot" anchorOrigin={{vertical: "top", horizontal: "left"}} sx={{ mt: 2, pl: 1, ml: -1 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                        </Badge>
                        <Typography variant="h6">
                            {content}
                        </Typography>
                    </CardContent>
                </Container>
            </CardActionArea>
        </Card>
    )
}
