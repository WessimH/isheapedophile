import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// 💖 Générateur de poèmes "façon IA"
const generatePoem = (yourAge, otherAge) => {
    const templates = [
        `À ${yourAge} ans, mon cœur s'est épris,\nDe ton sourire, de tes doux écrits.\nEt toi à ${otherAge}, si lumineux,\nTu rends mes jours bien plus heureux.`,
        `Entre ${yourAge} et ${otherAge} printemps,\nNaît un amour doux et charmant.\nDans chaque regard, un feu discret,\nQui réchauffe nos tendres secrets.`,
        `Toi, ${otherAge} ans de lumière,\nMoi, ${yourAge}, un brin de mystère.\nNos âmes dansent sans détour,\nSur les notes d’un tendre amour.`,
        `${yourAge} ans à rêver d’étoiles,\nEt ${otherAge} pour écrire l’histoire.\nNotre lien, doux comme une toile,\nPeint les couleurs d’un doux espoir.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
};

// 🧠 Évaluation morale de la relation
const evaluateMoralite = (yourAge, otherAge, yourSituation, otherSituation) => {
    const ageDiff = Math.abs(yourAge - otherAge);
    const bothMajors = yourAge >= 18 && otherAge >= 18;
    const bothMinors = yourAge < 18 && otherAge < 18;

    if (bothMinors) {
        if (yourSituation === "high school" && otherSituation === "high school" && ageDiff <= 3) {
            return "👍 Relation équilibrée entre lycéens.";
        }
        if (yourSituation === "high school" && otherSituation === "university" && ageDiff > 2) {
            return "⚠️ Légale, mais moralement limite (lycée/université avec écart important).";
        }
        return "⚠️ Légale entre mineurs mais potentiellement déséquilibrée.";
    }

    if (yourAge < 18 || otherAge < 18) {
        return "❌ L’un est mineur, l’autre majeur : situation moralement douteuse.";
    }

    // Les deux sont majeurs
    if (yourSituation === "working" && otherSituation === "working" && ageDiff <= 10) {
        return "👍 Relation adulte équilibrée.";
    }
    if ((yourSituation === "high school" && otherSituation === "working") || (yourSituation === "working" && otherSituation === "high school")) {
        return "❌ L’un travaille, l’autre est au lycée : déséquilibre moral.";
    }

    return "⚠️ Légale, mais attention à l'écart d'âge et au contexte.";
};

function AgeForm() {
    const [yourAge, setYourAge] = useState('');
    const [otherAge, setOtherAge] = useState('');
    const [situation, setSituation] = useState('');
    const [otherSituation, setOtherSituation] = useState('');
    const [dialog, setDialog] = useState({ open: false, title: '', message: '', warning: false });

    const handleSubmit = (e) => {
        e.preventDefault();

        const yourAgeNum = parseInt(yourAge, 10);
        const otherAgeNum = parseInt(otherAge, 10);

        if (yourAgeNum < 18 && otherAgeNum >= 18) {
            setDialog({
                open: true,
                title: '⚠️ Prévention',
                message:
                    "Une relation entre un·e mineur·e et un·e majeur·e peut être inappropriée ou illégale. Si tu ressens un malaise, parle à un adulte de confiance ou appelle le 119 (France).",
                warning: true,
            });
            return;
        }

        if (yourAgeNum < 18 && otherAgeNum < 18) {
            const ageDiff = Math.abs(yourAgeNum - otherAgeNum);
            if (ageDiff > 3) {
                setDialog({
                    open: true,
                    title: '⚠️ Attention',
                    message:
                        "Même entre mineurs, un écart d’âge important peut créer un déséquilibre. Sois prudent·e et cherche du soutien si besoin.",
                    warning: true,
                });
                return;
            }
        }

        const poem = generatePoem(yourAgeNum, otherAgeNum);
        const moralite = evaluateMoralite(yourAgeNum, otherAgeNum, situation, otherSituation);

        setDialog({
            open: true,
            title: '💖 Résultat de votre relation',
            message: `${poem}\n\n🧠 Analyse morale :\n${moralite}`,
            warning: false,
        });
    };

    const handleCloseDialog = () => {
        setDialog({ ...dialog, open: false });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    💬 Vérificateur de relation
                </Typography>

                <TextField
                    label="Ton âge"
                    type="number"
                    value={yourAge}
                    onChange={(e) => setYourAge(e.target.value)}
                    required
                    fullWidth
                />

                <FormControl fullWidth required>
                    <InputLabel>Ta situation</InputLabel>
                    <Select value={situation} onChange={(e) => setSituation(e.target.value)} label="Ta situation">
                        <MenuItem value="middle school">Collège</MenuItem>
                        <MenuItem value="high school">Lycée</MenuItem>
                        <MenuItem value="university">Université</MenuItem>
                        <MenuItem value="working">Travail</MenuItem>
                        <MenuItem value="other">Autre</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Âge de l'autre personne"
                    type="number"
                    value={otherAge}
                    onChange={(e) => setOtherAge(e.target.value)}
                    required
                    fullWidth
                />

                <FormControl fullWidth required>
                    <InputLabel>Situation de l'autre personne</InputLabel>
                    <Select
                        value={otherSituation}
                        onChange={(e) => setOtherSituation(e.target.value)}
                        label="Situation de l'autre personne"
                    >
                        <MenuItem value="middle school">Collège</MenuItem>
                        <MenuItem value="high school">Lycée</MenuItem>
                        <MenuItem value="university">Université</MenuItem>
                        <MenuItem value="working">Travail</MenuItem>
                        <MenuItem value="other">Autre</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" type="submit">
                    Vérifier
                </Button>
            </Box>

            <Dialog open={dialog.open} onClose={handleCloseDialog}>
                <DialogTitle>
                    {dialog.warning ? (
                        <WarningAmberIcon color="error" sx={{ mr: 1 }} />
                    ) : (
                        <FavoriteIcon color="primary" sx={{ mr: 1 }} />
                    )}
                    {dialog.title}
                </DialogTitle>
                <DialogContent>
                    <Typography whiteSpace="pre-line">{dialog.message}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default AgeForm;
