# Continuity report — 50 episodes

Mode: **ai+rules** · `gemini-3.5-flash-lite` · prompt continuity-v3 · 154.7s · 2026-11-20T18:37:24.663Z
LLM usage: 28 calls, 181756 in / 19215 out tokens

**16 issues** (high 14, medium 2, low 0; 0 with unverifiable evidence, listed last)

## C001 · [high] One character, 2 speaker labels: CATHERINE / LADY CATHERINE
_speaker_label_drift · found by rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes.

**Fix:** Map every label to "CATHERINE" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 20 | E20.2 | 00:02.90 | CATHERINE: "Two lumps of sugar, Rupert?" (187 lines in Ep 20, 28, 29, 30, 31, 32, 37, 40) | ✓ |
| 27 | E27.30 | 00:52.20 | LADY CATHERINE: "What is that maid doing in Her Grace's private chamber?" (9 lines in Ep 27) | ✓ |

## C002 · [high] One character, 2 speaker labels: JULIANA / LADY JULIANA
_speaker_label_drift · found by rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes.

**Fix:** Map every label to "JULIANA" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 4 | E4.16 | 00:20.00 | JULIANA: "You don't even know me." (352 lines in Ep 4, 5, 6, 7, 8, 9, 10, 11) | ✓ |
| 1 | E1.8 | 00:13.50 | LADY JULIANA: "Why?" (110 lines in Ep 1, 2, 3, 21, 22, 23, 24, 34) | ✓ |

## C003 · [high] Name spelled 6 ways: Ashburg / Ashbury / Ashburton / Ashbourne / Ashburgh / Ashburn
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

## C004 · [high] Name spelled 2 ways: Ashworth / Ashwood
_name_drift · found by rules_

These look like one proper name written differently across episodes. Voice generation will pronounce each spelling differently and subtitles will disagree. (Check: if they really are different people or places, mark it "not an issue".)

**Fix:** Choose one spelling (most used: "Ashworth") and replace the rest.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 12 | E12.33 | 00:46.70 | ep into the frozen blackthorn briars at Ashworth Manor. The thorns have grown over it... ("Ashworth" × 1 (Ep 12)) | ✓ |
| 35 | E35.69 | 02:25.50 | en behind it... are the same men ruling Ashwood now. ("Ashwood" × 1 (Ep 35)) | ✓ |

## C005 · [high] Name spelled 2 ways: Clarissa / Clarisse
_name_drift · found by rules_

These look like one proper name written differently across episodes. Voice generation will pronounce each spelling differently and subtitles will disagree. (Check: if they really are different people or places, mark it "not an issue".)

**Fix:** Choose one spelling (most used: "Clarissa") and replace the rest.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 1 | E1.68 | 01:38.80 | Clarissa knows how to carry herself. ("Clarissa" × 21 (Ep 1, 2, 4, 11, 12, 13)) | ✓ |
| 1 | E1.78 | 01:53.30 | Clarissa is the jewel of this family. ("Clarissa" × 21 (Ep 1, 2, 4, 11, 12, 13)) | ✓ |
| 31 | E31.28 | 00:51.00 | one saw you. Everyone watched him chose Clarisse. ("Clarisse" × 1 (Ep 31)) | ✓ |

## C006 · [high] Conflicting Accounts of Who Married Gerald at the Altar
_fact_conflict · found by ai · impact: story_

In Episode 1, it is established that Clarissa married Gerald at the altar after abandoning Juliana. However, in Episode 31, the dialogue states that Gerald left Juliana standing at the altar for 'Clarisse' (a spelling/naming variant, but explicitly the same person/event), yet another line in the same episode states that Clarissa married Gerald after he left Juliana, creating internal narrative confusion over whether the marriage ceremony actually took-place or was just an abandonment.

**Fix:** Standardize the exact outcome of the altar scene across all dialogue (e.g., whether they were legally married then or if he merely chose her and left).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 1 | E1.26 | 00:39.10 | Because he is marrying me. | ✓ |
| 31 | E31.28 | 00:51.00 | Everyone saw you. Everyone watched him chose Clarisse. | ✓ |

## C007 · [high] One character, 3 speaker labels: LADY IN GOLD GOWN / CLARISSA / LADY CLARISSA
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "LADY IN GOLD GOWN" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 1 | E1.26 | 00:39.10 | Because he is marrying me. (LADY IN GOLD GOWN: 17 lines, Ep 1, 2, 3 — The logline states Gerald abandons Juliana at the altar for her cruel sister Clarissa, and the bride marrying Gerald is identified as this label.) | ✓ |
| 4 | E4.9 | 00:09.00 | CLARISSA: "How fitting." (17 lines in Ep 4, 5, 12, 13) | ✓ |
| 37 | E37.25 | 00:44.50 | LADY CLARISSA: "Catherine's wedding." (11 lines in Ep 37) | ✓ |

## C008 · [high] One character, 2 speaker labels: GERALD / THE FORMER GROOM
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "GERALD" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 4 | E4.4 | 00:03.40 | GERALD: "Look at him." (32 lines in Ep 4, 5, 7, 11, 12, 13) | ✓ |
| 1 | E1.20 | 00:32.80 | Gerald? (THE FORMER GROOM: 16 lines, Ep 1, 2, 3, 9 — Juliana directly addresses this groom as Gerald when he is standing at the altar with her sister.) | ✓ |

## C009 · [high] One character, 2 speaker labels: BLOND NOBLEMAN / LORD HARRINGTON
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "BLOND NOBLEMAN" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 2 | E2.27 | 00:37.50 | Gerald has made his choice. Accept it, Juliana. (BLOND NOBLEMAN: 53 lines, Ep 2, 9, 27, 28, 37, 40 — Juliana's father figure/lord in the family addressing her at the altar, matching series recurring senior lord roles.) | ✓ |
| 40 | E40.9 | 00:19.20 | LORD HARRINGTON: "And soon, we'll be connected to the Duchess of Ashburgh." (4 lines in Ep 40) | ✓ |

## C010 · [high] One character, 2 speaker labels: NOBLE MATRIARCH / LADY ASHCROFT
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "NOBLE MATRIARCH" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 4 | E4.96 | 02:07.50 | Do not bring this man anywhere near Ashcroft Manor! (NOBLE MATRIARCH: 11 lines, Ep 3 — The matriarch of Ashcroft Manor who banishes Juliana is Lady Ashcroft.) | ✓ |
| 4 | E4.96 | 02:07.50 | LADY ASHCROFT: "Do not bring this man anywhere near Ashcroft Manor!" (6 lines in Ep 4, 5) | ✓ |

## C011 · [high] One character, 2 speaker labels: ALEXANDER / THE BEARDED STRANGER
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "ALEXANDER" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 8 | E8.12 | 00:12.00 | ALEXANDER: "Good for wounds. Fever, too." (202 lines in Ep 8, 9, 10, 11, 12, 13, 14, 16) | ✓ |
| 8 | E8.logline | 00:00.00 | Alexander bonds with her over rustic medicinal knowledge and war-worn memories (THE BEARDED STRANGER: 15 lines, Ep 3 — The loglines for subsequent episodes identify Juliana's husband as Alexander.) | ✓ |

## C012 · [high] One character, 3 speaker labels: LORD / RUPERT / NOBLEMAN
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "LORD" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 36 | E36.logline | 00:00.00 | Learning from his mother that Rupert and Catherine framed Juliana for witchcraft (LORD: 36 lines, Ep 33, 34 — Logline for Episode 36 states Rupert framed Juliana for witchcraft, matching the LORD orchestrating the false testimony in Episode 33.) | ✓ |
| 20 | E20.5 | 00:08.20 | RUPERT: "Only if it sweetens your disposition, Catherine." (22 lines in Ep 20, 30, 45) | ✓ |
| 37 | E37.3 | 00:06.00 | Every important family in the county should witness it. (NOBLEMAN: 8 lines, Ep 37, 41 — The script cues alternate between 'BLOND NOBLEMAN (Rupert)' and 'NOBLEMAN' for the same speaking partner in scenes with Catherine and Clarissa.) | ✓ |

## C013 · [high] One character, 2 speaker labels: PRUDENCE / MAID
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "PRUDENCE" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 21 | E21.4 | 00:04.20 | PRUDENCE: "Lady Juliana! Please! You have to help me, Toby is dying!" (38 lines in Ep 21, 22, 23, 24, 34) | ✓ |
| 34 | E34.22 | 00:37.50 | JUDGE (Commanding): "Prudence. You served beside the accused?" (MAID: 20 lines, Ep 33 — The Judge addresses the maid by her name, Prudence, in Episode 34.) | ✓ |

## C014 · [high] One character, 2 speaker labels: HIGH PRIEST / FATHER THOMAS
_speaker_label_drift · found by ai+rules · impact: voice_

All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes. Unnamed labels were matched by the AI and confirmed by a quote found in the script.

**Fix:** Map every label to "HIGH PRIEST" in the story bible (or rename them in the scripts).

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 48 | E48.logline | 00:00.00 | plotting to use the council's ten-day reprieve to strike back at Alexander and Juliana with the aid of Father Thomas (HIGH PRIEST: 22 lines, Ep 45, 46 — Loglines for Episodes 48 and 49 identify Father Thomas as the conspirator aiding Catherine with the ecclesiastical council matters, matching the High Priest role.) | ✓ |
| 49 | E49.7 | 00:09.00 | FATHER THOMAS: "Agnes is thorough. She made me wait for a groom to finish his rounds b" (17 lines in Ep 49, 50) | ✓ |

## C015 · [medium] One prop, 7 names: mother's book / mother's scorched leather-bound herbal / mother's book almost burned / mother's leather-bound herbal ledger / mother's remedy journal / mother's little book / mother's ledger
_prop_drift · found by ai+rules · impact: face_

Multiple references to the mother's herbal book, ledger, and journal across episodes that track its scorching and recurring use. An image/video model given different nouns will draw different objects, so the prop changes shape between episodes.

**Fix:** Use one name ("mother's leather-bound herbal") in action lines and one reference image for it.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 33 | E33.24 | 00:37.50 | Did she use her mother's book? ("mother's book" × 3 (Ep 33, 34)) | ✓ |
| 19 | E19.0 | 00:00.00 | Juliana clutches her mother's scorched leather-bound herbal book against her chest, her face streaked with soo ("mother's scorched leather-bound herbal" × 1 (Ep 19)) | ✓ |
| 19 | E19.4 | 00:05.10 | My mother's book almost burned with it. ("mother's book almost burned" × 1 (Ep 19)) | ✓ |
| 21 | E21.74 | 01:48.50 | Lady Juliana sits motionless at the rustic wooden table, her bandaged hands holding open her late mother's lea ("mother's leather-bound herbal ledger" × 1 (Ep 21)) | ✓ |
| 24 | E24.63 | 01:21.20 | Juliana pauses scrubbing. Her soot-caked fingers reach into the deep pocket of her apron, carefully feeling th ("mother's remedy journal" × 1 (Ep 24)) | ✓ |
| 29 | E29.12 | 00:21.00 | Your mother's little book of weeds? ("mother's little book" × 1 (Ep 29)) | ✓ |
| 29 | E29.68 | 01:46.50 | They took my mother's ledger... ("mother's ledger" × 1 (Ep 29)) | ✓ |

## C016 · [medium] Contradictory Possession of Mother's Herbal Ledger
_fact_conflict · found by ai · impact: story_

In Episode 31, Catherine takes Juliana's late mother's botanical book/ledger and threatens to burn it or burns it. Yet later in the ledger timeline, Juliana's mother's ledger/herbarium is repeatedly referenced as being carried or possessed by Juliana in subsequent scenes without a clear explanation of how she retrieved it.

**Fix:** Ensure the ledger's destruction or recovery is explicitly shown if Catherine attempts to burn it.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 31 | E31.73 | 02:14.50 | This pathetic book is the only thing you still have from your mother. | ✓ |
| 21 | E21.22 | 00:35.80 | snatch her heavy leather-bound herbal ledger from the wooden workbench | ✓ |

## Story bible (built by code from verified clusters)

| Canonical speaker label | All labels for this character | Lines | Episodes |
|---|---|---|---|
| JULIANA | JULIANA, LADY JULIANA | 462 | 39 |
| ALEXANDER | ALEXANDER, THE BEARDED STRANGER | 217 | 22 |
| CATHERINE | CATHERINE, LADY CATHERINE | 196 | 19 |
| LORD | LORD, RUPERT, NOBLEMAN | 66 | 7 |
| PRUDENCE | PRUDENCE, MAID | 58 | 6 |
| BLOND NOBLEMAN | BLOND NOBLEMAN, LORD HARRINGTON | 57 | 10 |
| GERALD | GERALD, THE FORMER GROOM | 48 | 10 |
| LADY IN GOLD GOWN | LADY IN GOLD GOWN, CLARISSA, LADY CLARISSA | 45 | 8 |
| ALEXANDER'S MOTHER | ALEXANDER'S MOTHER | 39 | 3 |
| HIGH PRIEST | HIGH PRIEST, FATHER THOMAS | 39 | 4 |
| MYSTERIOUS BEARDED MAN | MYSTERIOUS BEARDED MAN | 28 | 3 |
| DOWAGER DUCHESS | DOWAGER DUCHESS | 26 | 4 |
| ELDER NOBLEMAN | ELDER NOBLEMAN | 19 | 2 |
| JUDGE | JUDGE | 19 | 1 |
| NOBLE MATRIARCH | NOBLE MATRIARCH, LADY ASHCROFT | 17 | 3 |

| Place (canonical) | Variants found |
|---|---|
| Clarissa | Clarissa, Clarisse |
| Ashworth | Ashworth, Ashwood |
| Ashburton | Ashburg, Ashbury, Ashburton, Ashbourne, Ashburgh, Ashburn |

| Object (canonical) | Variants found |
|---|---|
| mother's leather-bound herbal | mother's book, mother's scorched leather-bound herbal, mother's book almost burned, mother's leather-bound herbal ledger, mother's remedy journal, mother's little book, mother's ledger |

**Unnamed labels not merged** (low confidence, no verified quote, or a new character):
- ALEXANDER'S MOTHER → NEW (high) She is Alexander's mother and never receives a personal given name in the series dialogue or logs.
- ELDER NOBLEMAN → NEW (high) The character is consistently addressed and referred to as the Elder Nobleman across multiple episodes without being assigned a proper name in the provided script or series text.
- JUDGE → NEW (high) The judge presides over the trial and passes judgment, but never receives a personal name in the dialogue or series lore.
- MATRIARCH → NEW (low) She is referred to as the family matriarch in action lines and loglines, but no specific named speaker label from the series list directly matches her (Lady Ashcroft, Lady Catherine, etc., appear in later episodes and are not definitively linked here).
- ROYAL GUARD → NEW (medium) Generic minor guard character with no specific named identity in the provided script or series speaker list.
- NOBLEWOMAN → LADY CATHERINE (high) impossible: NOBLEWOMAN and CATHERINE both speak in Ep 41 scene 1
- INFORMANT → NEW (high) This character is a loyal spy who provides secret intelligence to Alexander and is never given a proper name in the series.
- ELDER VILLAGER → NEW (high) This character is a villager who gives shelter to Juliana and Alexander and is never assigned a personal name in the dialogue or series.
- CROWN OFFICIAL → NEW (high) The official reading the war office documents does not receive a named speaker label anywhere in the series.
- POLICE CONSTABLE → NEW (high) The constable who arrests Lord Sterling is referred to solely by his functional title and is never given a proper name.
- PEASANT MOTHER → NEW (high) The character is a local peasant mother seeking medical help for her child and is never assigned a named identity in the script or series loglines.
- HOUSEKEEPER → NEW (high) The housekeeper is never referred to by a proper name in the episode dialogue or logline.
- CONSTABLE → NEW (high) The character performs an official role (law enforcement arresting Alexander) and is never given a proper first or last name in the scripts or series character list.
- LOYALIST FIGHTER → NEW (high) The speaker is an anonymous loyalist operative assisting Alexander and is never given a proper name in the series.
- GUARD → NEW (high) The character is a generic castle guard with no personal name or identifying title revealed in the series.