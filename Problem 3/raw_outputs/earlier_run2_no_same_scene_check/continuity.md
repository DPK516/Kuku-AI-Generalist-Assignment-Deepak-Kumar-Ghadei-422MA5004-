# Continuity report — 50 episodes

Mode: **ai+rules** · `gemini-3.5-flash-lite` · prompt continuity-v3 · 314s · 2026-11-20T18:19:15.953Z
LLM usage: 31 calls, 188922 in / 25336 out tokens

**13 issues** (high 12, medium 1, low 0; 0 with unverifiable evidence, listed last)

## C001 · [high] One character, 2 speaker labels: JULIANA / LADY JULIANA
_speaker_label_drift · found by rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes.

**Fix:** Map every label to "JULIANA" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 4 | E4.16 | 00:20.00 | JULIANA: "You don't even know me." (352 lines in Ep 4, 5, 6, 7, 8, 9, 10, 11) | ✓ |
| 1 | E1.8 | 00:13.50 | LADY JULIANA: "Why?" (110 lines in Ep 1, 2, 3, 21, 22, 23, 24, 34) | ✓ |

## C002 · [high] Name spelled 6 ways: Ashburg / Ashbury / Ashburton / Ashbourne / Ashburgh / Ashburn
_name_drift · found by rules_

These look like one proper name written differently across episodes. Voice generation will pronounce each spelling differently and subtitles will disagree. (Check: if they really are different people or places, mark it "not an issue".)

**Fix:** Choose one spelling (most used: "Ashburton") and replace the rest.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 22 | E22.7 | 00:14.20 | This is Ashburton Manor. The housekeeper watches everyone ("Ashburton" × 8 (Ep 22, 45, 46)) | ✓ |
| 45 | E45.20 | 00:24.60 | Alexander Ashburton. The rightful Duke of Ashburton. ("Ashburton" × 8 (Ep 22, 45, 46)) | ✓ |
| 27 | E27.11 | 00:17.20 | That is no ordinary band. It bears the Ashbourne crest. ("Ashbourne" × 8 (Ep 27, 36, 47)) | ✓ |
| 27 | E27.logline | 00:00.00 | alizes Juliana's wedding ring bears the Ashbourne crest belonging to her lost son, but be ("Ashbourne" × 8 (Ep 27, 36, 47)) | ✓ |
| 42 | E42.33 | 01:04.20 | ne hear me! This is my son... Alexander Ashburn. The rightful Duke of Ashburn! ("Ashburn" × 6 (Ep 42, 43)) | ✓ |
| 42 | E42.logline | 00:00.00 |  and is proclaimed the rightful Duke of Ashburn by his weeping mother. ("Ashburn" × 6 (Ep 42, 43)) | ✓ |
| 20 | E20.11 | 00:18.80 | I marry the Lord of Ashbury. ("Ashbury" × 5 (Ep 20, 21, 22)) | ✓ |
| 20 | E20.63 | 01:41.50 | ...Ashbury will finally belong to us. ("Ashbury" × 5 (Ep 20, 21, 22)) | ✓ |
| 19 | E19.29 | 00:47.10 | Tell me what is happening in Ashburg. ("Ashburg" × 4 (Ep 19, 25)) | ✓ |
| 19 | E19.31 | 00:55.30 | Rupert has become the face of Ashburg. He sits in your father's room, signs y ("Ashburg" × 4 (Ep 19, 25)) | ✓ |
| 40 | E40.9 | 00:19.20 | n, we'll be connected to the Duchess of Ashburgh. ("Ashburgh" × 4 (Ep 40, 41)) | ✓ |
| 40 | E40.35 | 01:09.80 | By sunset, Ashburgh will have its new Duke and Duchess. ("Ashburgh" × 4 (Ep 40, 41)) | ✓ |

## C003 · [high] Name spelled 2 ways: Ashworth / Ashwood
_name_drift · found by rules_

These look like one proper name written differently across episodes. Voice generation will pronounce each spelling differently and subtitles will disagree. (Check: if they really are different people or places, mark it "not an issue".)

**Fix:** Choose one spelling (most used: "Ashworth") and replace the rest.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 12 | E12.33 | 00:46.70 | ep into the frozen blackthorn briars at Ashworth Manor. The thorns have grown over it... ("Ashworth" × 1 (Ep 12)) | ✓ |
| 35 | E35.69 | 02:25.50 | en behind it... are the same men ruling Ashwood now. ("Ashwood" × 1 (Ep 35)) | ✓ |

## C004 · [high] Name spelled 2 ways: Clarissa / Clarisse
_name_drift · found by rules_

These look like one proper name written differently across episodes. Voice generation will pronounce each spelling differently and subtitles will disagree. (Check: if they really are different people or places, mark it "not an issue".)

**Fix:** Choose one spelling (most used: "Clarissa") and replace the rest.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 1 | E1.68 | 01:38.80 | Clarissa knows how to carry herself. ("Clarissa" × 21 (Ep 1, 2, 4, 11, 12, 13)) | ✓ |
| 1 | E1.78 | 01:53.30 | Clarissa is the jewel of this family. ("Clarissa" × 21 (Ep 1, 2, 4, 11, 12, 13)) | ✓ |
| 31 | E31.28 | 00:51.00 | one saw you. Everyone watched him chose Clarisse. ("Clarisse" × 1 (Ep 31)) | ✓ |

## C005 · [high] One character, 3 speaker labels: LADY IN GOLD GOWN / CLARISSA / LADY CLARISSA
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "LADY IN GOLD GOWN" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 1 | E1.26 | 00:39.10 | Because he is marrying me. (LADY IN GOLD GOWN: 17 lines, Ep 1, 2, 3 — The loglines state Gerald abandons Juliana at the altar for her cruel sister Clarissa, and the lady in the gold gown is marrying Gerald.) | ✓ |
| 4 | E4.9 | 00:09.00 | CLARISSA: "How fitting." (17 lines in Ep 4, 5, 12, 13) | ✓ |
| 37 | E37.25 | 00:44.50 | LADY CLARISSA: "Catherine's wedding." (11 lines in Ep 37) | ✓ |

## C006 · [high] One character, 2 speaker labels: GERALD / THE FORMER GROOM
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "GERALD" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 4 | E4.4 | 00:03.40 | GERALD: "Look at him." (32 lines in Ep 4, 5, 7, 11, 12, 13) | ✓ |
| 2 | E2.0 | 00:00.00 | I cannot marry you, Juliana. (THE FORMER GROOM: 16 lines, Ep 1, 2, 3, 9 — The loglines and dialogue establish this speaker as Juliana's fiancé who abandoned her at the altar, named Gerald.) | ✓ |

## C007 · [high] One character, 2 speaker labels: BLOND NOBLEMAN / LORD HARRINGTON
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "BLOND NOBLEMAN" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 2 | E2.27 | 00:37.50 | Gerald has made his choice. Accept it, Juliana. (BLOND NOBLEMAN: 53 lines, Ep 2, 9, 27, 28, 37, 40 — Based on series speaker mapping and context where her father speaks to her in the chapel.) | ✓ |
| 40 | E40.9 | 00:19.20 | LORD HARRINGTON: "And soon, we'll be connected to the Duchess of Ashburgh." (4 lines in Ep 40) | ✓ |

## C008 · [high] One character, 2 speaker labels: NOBLE MATRIARCH / LADY ASHCROFT
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "NOBLE MATRIARCH" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 4 | E4.96 | 02:07.50 | LADY ASHCROFT (Imperious, Shouting): 'Do not bring this man anywhere near Ashcroft Manor!' (NOBLE MATRIARCH: 11 lines, Ep 3 — The matriarch of the family banishing Juliana and referenced in connection with Ashcroft Manor is Lady Ashcroft.) | ✓ |
| 4 | E4.96 | 02:07.50 | LADY ASHCROFT: "Do not bring this man anywhere near Ashcroft Manor!" (6 lines in Ep 4, 5) | ✓ |

## C009 · [high] One character, 3 speaker labels: ALEXANDER / MYSTERIOUS BEARDED MAN / THE BEARDED STRANGER
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "ALEXANDER" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 8 | E8.12 | 00:12.00 | ALEXANDER: "Good for wounds. Fever, too." (202 lines in Ep 8, 9, 10, 11, 12, 13, 14, 16) | ✓ |
| 8 | E8.logline | 00:00.00 | As Juliana inspects her late mother's weathered herbal grimoire, Alexander bonds with her over rustic medicinal knowledge (MYSTERIOUS BEARDED MAN: 28 lines, Ep 4, 5, 6 — The loglines for Episode 8 identify the husband/warrior character as Alexander.) | ✓ |
| 8 | E8.logline | 00:00.00 | Alexander bonds with her over rustic medicinal knowledge and war-worn memories (THE BEARDED STRANGER: 15 lines, Ep 3 — The loglines and series continuity identify the mysterious bearded warrior and husband as Alexander.) | ✓ |

## C010 · [high] One character, 4 speaker labels: CATHERINE / DOWAGER DUCHESS / NOBLEWOMAN / LADY CATHERINE
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "CATHERINE" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 20 | E20.2 | 00:02.90 | CATHERINE: "Two lumps of sugar, Rupert?" (187 lines in Ep 20, 28, 29, 30, 31, 32, 37, 40) | ✓ |
| 27 | E27.30 | 00:52.20 | What is that maid doing in Her Grace's private chamber? (DOWAGER DUCHESS: 26 lines, Ep 26, 27, 28, 43 — Lady Catherine refers to the Dowager Duchess as 'Her Grace' in her private chamber, and later episodes identify her as Lady Catherine or Catherine.) | ✓ |
| 25 | E25.23 | 00:36.00 | JULIANA (Quiet, Apprehensive): "Lady Catherine." (NOBLEWOMAN: 14 lines, Ep 24, 41 — In Episode 25, Juliana identifies the noblewoman who struck her in Episode 24 as Lady Catherine.) | ✓ |
| 27 | E27.30 | 00:52.20 | LADY CATHERINE: "What is that maid doing in Her Grace's private chamber?" (9 lines in Ep 27) | ✓ |

## C011 · [high] One character, 2 speaker labels: LORD / RUPERT
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "LORD" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 36 | E36.logline | 00:00.00 | Learning from his mother that Rupert and Catherine framed Juliana for witchcraft (LORD: 36 lines, Ep 33, 34 — Ep 36 logline states Rupert framed Juliana for witchcraft, matching the Lord coercing testimony in Ep 33 and appearing at the trial in Ep 34.) | ✓ |
| 20 | E20.5 | 00:08.20 | RUPERT: "Only if it sweetens your disposition, Catherine." (22 lines in Ep 20, 30, 45) | ✓ |

## C012 · [high] One character, 2 speaker labels: PRUDENCE / MAID
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "PRUDENCE" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 21 | E21.4 | 00:04.20 | PRUDENCE: "Lady Juliana! Please! You have to help me, Toby is dying!" (38 lines in Ep 21, 22, 23, 24, 34) | ✓ |
| 34 | E34.22 | 00:37.50 | JUDGE (Commanding): "Prudence. You served beside the accused?" (MAID: 20 lines, Ep 33 — The Judge addresses the young maid as Prudence directly in Episode 34.) | ✓ |

## C013 · [medium] One prop, 7 names: mother's book / mother's scorched leather-bound herbal / mother's book almost burned / mother's leather-bound herbal ledger / mother's remedy journal / mother's little book / mother's ledger
_prop_drift · found by ai+rules · impact: face_

Multiple references to the mother's bound book of herbs, remedies, and ledger entries across various states of damage. An image/video model given different nouns will draw different objects, so the prop changes shape between episodes.

**Fix:** Use one name ("mother's herbal book") in action lines and one reference image for it.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 33 | E33.24 | 00:37.50 | Did she use her mother's book? ("mother's book" × 3 (Ep 33, 34)) | ✓ |
| 19 | E19.0 | 00:00.00 | Juliana clutches her mother's scorched leather-bound herbal book against her chest, her face streaked with soo ("mother's scorched leather-bound herbal" × 1 (Ep 19)) | ✓ |
| 19 | E19.4 | 00:05.10 | My mother's book almost burned with it. ("mother's book almost burned" × 1 (Ep 19)) | ✓ |
| 21 | E21.74 | 01:48.50 | Lady Juliana sits motionless at the rustic wooden table, her bandaged hands holding open her late mother's lea ("mother's leather-bound herbal ledger" × 1 (Ep 21)) | ✓ |
| 24 | E24.63 | 01:21.20 | Juliana pauses scrubbing. Her soot-caked fingers reach into the deep pocket of her apron, carefully feeling th ("mother's remedy journal" × 1 (Ep 24)) | ✓ |
| 29 | E29.12 | 00:21.00 | Your mother's little book of weeds? ("mother's little book" × 1 (Ep 29)) | ✓ |
| 29 | E29.68 | 01:46.50 | They took my mother's ledger... ("mother's ledger" × 1 (Ep 29)) | ✓ |

## Story bible (built by code from verified clusters)

| Canonical speaker label | All labels for this character | Lines | Episodes |
|---|---|---|---|
| JULIANA | JULIANA, LADY JULIANA | 462 | 39 |
| ALEXANDER | ALEXANDER, MYSTERIOUS BEARDED MAN, THE BEARDED STRANGER | 245 | 25 |
| CATHERINE | CATHERINE, DOWAGER DUCHESS, NOBLEWOMAN, LADY CATHERINE | 236 | 21 |
| LORD | LORD, RUPERT | 58 | 5 |
| PRUDENCE | PRUDENCE, MAID | 58 | 6 |
| BLOND NOBLEMAN | BLOND NOBLEMAN, LORD HARRINGTON | 57 | 10 |
| GERALD | GERALD, THE FORMER GROOM | 48 | 10 |
| LADY IN GOLD GOWN | LADY IN GOLD GOWN, CLARISSA, LADY CLARISSA | 45 | 8 |
| ALEXANDER'S MOTHER | ALEXANDER'S MOTHER | 39 | 3 |
| HIGH PRIEST | HIGH PRIEST | 22 | 2 |
| ELDER NOBLEMAN | ELDER NOBLEMAN | 19 | 2 |
| JUDGE | JUDGE | 19 | 1 |
| NOBLE MATRIARCH | NOBLE MATRIARCH, LADY ASHCROFT | 17 | 3 |
| FATHER THOMAS | FATHER THOMAS | 17 | 2 |

| Place (canonical) | Variants found |
|---|---|
| Clarissa | Clarissa, Clarisse |
| Ashworth | Ashworth, Ashwood |
| Ashburton | Ashburg, Ashbury, Ashburton, Ashbourne, Ashburgh, Ashburn |

| Object (canonical) | Variants found |
|---|---|
| mother's herbal book | mother's book, mother's scorched leather-bound herbal, mother's book almost burned, mother's leather-bound herbal ledger, mother's remedy journal, mother's little book, mother's ledger |

**Unnamed labels not merged** (low confidence, no verified quote, or a new character):
- ALEXANDER'S MOTHER → NEW (high) She is Alexander's mother and referred to exclusively as Alexander's mother throughout the script series without ever being given a personal first or last name.
- THE PRIEST → NEW (high) The priest who officiates the wedding does not correspond to any of the named speaker labels provided in the series character list.
- HIGH PRIEST → FATHER THOMAS (high) evidence not found in script
- ELDER NOBLEMAN → NEW (high) The character is referred to solely as the elder nobleman throughout the script loglines and actions without ever receiving a specific proper name in the series.
- JUDGE → NEW (high) The character acts as the presiding authority in a legal trial and is never addressed by a specific name in the series, only by his professional title.
- MATRIARCH → NEW (low) Referred to as the matriarch or stepmother in the loglines, but no specific personal first or last name from the series speaker list matches this role directly in Ep 1.
- ROYAL GUARD → NEW (low) Generic guard role with no specific named character identity assigned in the series loglines.
- THUG WITH CAP → NEW (high) This thug is never given a proper named character label throughout the series.
- BALD THUG → NEW (high) This thug is never given a proper named character label throughout the series.
- INFORMANT → NEW (high) The character provides intelligence to Alexander about Ashburg and never receives a proper name in the series.
- ELDER VILLAGER → NEW (high) The local villager offers Juliana and Alexander shelter in the barn and never receives a proper name.
- CROWN OFFICIAL → NEW (high) Performs official reading duties for the Crown dossier without ever being addressed by a proper name in the series.
- POLICE CONSTABLE → NEW (high) Enforces the arrest of Lord Sterling on behalf of the Crown without receiving a named identity in the dialogue or loglines.
- PEASANT MOTHER → NEW (high) The character is an unnamed local villager seeking medical help for her child and is never given a proper name in the series.
- HOUSEKEEPER → NEW (high) The housekeeper interacts with Prudence and Juliana in Ashbury Manor, policing the staff, but is never referred to by a proper name in the series dialogue or loglines.
- CONSTABLE → NEW (high) The character is consistently referred to as 'the Constable' in both dialogue and action lines, and no other named character in the series list matches this role.
- LOYALIST FIGHTER → NEW (high) The speaker is an unnamed loyalist fighter acting alongside the scout and driver during the cathedral infiltration.
- GUARD → NEW (high) The character is a generic castle guard who has no individual proper name revealed in the script.