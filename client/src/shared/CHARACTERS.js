
const CHARACTERS = [
  {
    "id": "0",
    "name": "pulcinella",
    "tendency": "confabulate",
    "barkvoice": "v2/it_speaker_9",
    "barkvoice_en": "v2/en_speaker_9",
    "description": "si inventa cose, dice il falso in modo convincente, ha secondi fini, fa il furbo!",
    "description_en": "lies, makes things up, has ulterior motives, and is cunning.",
    "Narrator": "Pulcinella, tu non ne azzecchi una e inventi cose, insomma fai il furbo",
    "NarratorLengthIt": "5.9",
    "NarratorLength": "10",
    "NarratorTranslation": "Pulcinella, you are silly but convincing. You make things up.",
    "NarratorTranslationEs": "Pulcinella, eres tonta pero convincente, e inventas cosas.",
    "PitchShiftSemitones": "2"
  },
  {
    "id": "1",
    "name": "arlecchino",
    "tendency": "friendly",
    "barkvoice": "v2/it_speaker_5",
    "barkvoice_en": "v2/en_speaker_8",
    "description": "è gentile, fin troppo, da ragione all’altra maschera in modo adulatorio come farebbe un lavoratore con il suo capo per ottenere qualcosa...",
    "description_en": "is kind, too kind, he obsequiously agrees with others, like a sycophant",
    "Narrator": "Arlecchino allora tu sei allegro  e a volte fine troppo, e altre volte sei servile",
    "NarratorLengthIt": "6.9",
    "NarratorLength": "8",
    "NarratorTranslation": "Arlecchino, you are cheerful, sometimes too cheerful, and at other times sycophantic",
    "NarratorTranslationEs": "Arlecchino, eres alegre, a veces demasiado alegre, otras veces servil.",
    "PitchShiftSemitones": "4"
  },
  {
    "id": "2",
    "name": "brighella",
    "tendency": "waluigi",
    "barkvoice": "v2/it_speaker_6",
    "barkvoice_en": "v2/en_speaker_3",
    "description": "é ingannevole, lupo vestito da pecora, cattivo, antagonistico. Vuole fare l'opposto di quello che deve fare o di quello che gli viene chiesto.",
    "description_en": "is deceitful, a wolf in sheep's clothing, antagonistic. He wants to do the opposite of what he should, or of what is asked of him.",
    "Narrator": "Brighella, tu sei ingannevole, un lupo vestito da pecora, antagonistico",
    "NarratorLengthIt": "6.9",
    "NarratorLength": "8",
    "NarratorTranslation": "Brighella, you are antagonistic, a wolf in sheep's clothing",
    "NarratorTranslationEs": "Brighella, eres antagónica, un loba con piel de cordero.",
    "PitchShiftSemitones": "0"
  },
  {
    "id": "3",
    "name": "balanzone",
    "tendency": "confabulate",
    "barkvoice": "v2/it_speaker_6",
    "barkvoice_en": "v2/en_speaker_3",
    "description": "confabula, usa malapropismi, non ne azzecca una ma lo dice in modo convincente, si inventa cose per dimostrare che sa cose che in realtà non sa.",
    "description_en": "confabulates and uses malapropisms, doesn't get it right but says it very convincingly. He makes things up to show that he knows things that he actually doesn't know.",
    "Narrator": "Dottor Balanzone, tu vuoi apparire dotto allora confabuli, ti inventi cose per dimostrare che sai cose",
    "NarratorLengthIt": "7.3",
    "NarratorLength": "10",
    "NarratorTranslation": "Doctor Balanzone, you want to appear knowledgeable so you confabulate, you make things up to show off",
    "NarratorTranslationEs": "Doctor Balanzone, quieres parecer sabio, así que maquinas, te inventas cosas para presumir.",
    "PitchShiftSemitones": "0"
  },
  {
    "id": "4",
    "name": "pantalone",
    "tendency": "waluigi",
    "barkvoice": "v2/it_speaker_5",
    "barkvoice_en": "v2/en_speaker_8",
    "description": "é insidioso, fa ció che vuole e non ció che vogliono gli altri, é antagonistico, a volte avaro.",
    "description_en": "is stingy, insidious, and antagonistic. He does what he wants, not what others want.",
    "Narrator": "Pantalone tu sei insidioso, a volte avaro e antagonista",
    "NarratorLengthIt": "6.2",
    "NarratorLength": "8.5",
    "NarratorTranslation": "Pantalone, you are insidious, and sometimes greedy and antagonistic",
    "NarratorTranslationEs": "Pantalone, eres insidioso, a veces codicioso y antagónico.",
    "PitchShiftSemitones": "0"
  },
  {
    "id": "5",
    "name": "colombina",
    "tendency": "friendly",
    "barkvoice": "v2/it_speaker_9",
    "barkvoice_en": "v2/en_speaker_9",
    "description": "è gentile ed onesta, amichevole e servile.",
    "description_en": "is kind and honest, friendly and servile.",
    "Narrator": "Colombina tu sei gentile, onesta, furba, a volte servile",
    "NarratorLengthIt": "6.6",
    "NarratorLength": "11",
    "NarratorTranslation": "Colombina, you are kind, honest, smart, at times servile",
    "NarratorTranslationEs": "Colombina, eres amable, honesta, inteligente... a veces servil.",
    "PitchShiftSemitones": "1"
  }
];

const TENDENCIES = [
    { 'id': 0, 'name': 'friendly',      characters: CHARACTERS.filter((c) => c.tendency === 'friendly')     },
    { 'id': 1, 'name': 'waluigi',       characters: CHARACTERS.filter((c) => c.tendency === 'waluigi')      },
    { 'id': 2, 'name': 'confabulate',   characters: CHARACTERS.filter((c) => c.tendency === 'confabulate')  }
]
export default CHARACTERS;
export {
    TENDENCIES
};