# Continuity report — 50 episodes

Mode: **ai+rules** · `gemini-3.5-flash-lite` · prompt continuity-v2 · 99.3s · 2026-11-20T18:04:44.456Z
LLM usage: 6 calls, 94864 in / 13057 out tokens

**8 issues** (high 6, medium 2, low 0; 0 with unverifiable evidence, listed last)

## C001 · [high] Name spelled 6 ways: Ashburg / Ashbury / Ashburton / Ashbourne / Ashburgh / Ashburn
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

## C002 · [high] Name spelled 2 ways: Ashworth / Ashwood
_name_drift · found by rules_

These look like one proper name written differently across episodes. Voice generation will pronounce each spelling differently and subtitles will disagree. (Check: if they really are different people or places, mark it "not an issue".)

**Fix:** Choose one spelling (most used: "Ashworth") and replace the rest.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 12 | E12.33 | 00:46.70 | ep into the frozen blackthorn briars at Ashworth Manor. The thorns have grown over it... ("Ashworth" × 1 (Ep 12)) | ✓ |
| 35 | E35.69 | 02:25.50 | en behind it... are the same men ruling Ashwood now. ("Ashwood" × 1 (Ep 35)) | ✓ |

## C003 · [high] Name spelled 2 ways: Clarissa / Clarisse
_name_drift · found by rules_

These look like one proper name written differently across episodes. Voice generation will pronounce each spelling differently and subtitles will disagree. (Check: if they really are different people or places, mark it "not an issue".)

**Fix:** Choose one spelling (most used: "Clarissa") and replace the rest.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 1 | E1.68 | 01:38.80 | Clarissa knows how to carry herself. ("Clarissa" × 21 (Ep 1, 2, 4, 11, 12, 13)) | ✓ |
| 1 | E1.78 | 01:53.30 | Clarissa is the jewel of this family. ("Clarissa" × 21 (Ep 1, 2, 4, 11, 12, 13)) | ✓ |
| 31 | E31.28 | 00:51.00 | one saw you. Everyone watched him chose Clarisse. ("Clarisse" × 1 (Ep 31)) | ✓ |

## C004 · [high] One character, 2 speaker labels: CATHERINE / LADY CATHERINE
_speaker_label_drift · found by rules_

Dialogue for what looks like the same person ("CATHERINE") is labelled 2 different ways. In an AI pipeline the speaker label usually picks the voice and the face reference, so this is how a character's voice or face changes between episodes.

**Fix:** Pick one canonical label (e.g. "CATHERINE") and map the others to it in the story bible.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 20 | E20.2 | 00:02.90 | CATHERINE: "Two lumps of sugar, Rupert?" (187 lines in Ep 20, 28, 29, 30, 31, 32, 37, 40…) | ✓ |
| 27 | E27.30 | 00:52.20 | LADY CATHERINE: "What is that maid doing in Her Grace's private chamber?" (9 lines in Ep 27) | ✓ |

## C005 · [high] One character, 2 speaker labels: CLARISSA / LADY CLARISSA
_speaker_label_drift · found by rules_

Dialogue for what looks like the same person ("CLARISSA") is labelled 2 different ways. In an AI pipeline the speaker label usually picks the voice and the face reference, so this is how a character's voice or face changes between episodes.

**Fix:** Pick one canonical label (e.g. "CLARISSA") and map the others to it in the story bible.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 4 | E4.9 | 00:09.00 | CLARISSA: "How fitting." (17 lines in Ep 4, 5, 12, 13) | ✓ |
| 37 | E37.25 | 00:44.50 | LADY CLARISSA: "Catherine's wedding." (11 lines in Ep 37) | ✓ |

## C006 · [high] One character, 2 speaker labels: LADY JULIANA / JULIANA
_speaker_label_drift · found by rules_

Dialogue for what looks like the same person ("JULIANA") is labelled 2 different ways. In an AI pipeline the speaker label usually picks the voice and the face reference, so this is how a character's voice or face changes between episodes.

**Fix:** Pick one canonical label (e.g. "JULIANA") and map the others to it in the story bible.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 4 | E4.16 | 00:20.00 | JULIANA: "You don't even know me." (352 lines in Ep 4, 5, 6, 7, 8, 9, 10, 11…) | ✓ |
| 1 | E1.8 | 00:13.50 | LADY JULIANA: "Why?" (110 lines in Ep 1, 2, 3, 21, 22, 23, 24, 34) | ✓ |

## C007 · [medium] Inconsistent spelling of character Clarissa
_name_drift · found by ai · impact: subtitle_

The character's name is spelled both 'Clarissa' and 'Clarisse' in the scripts.

**Fix:** Choose one canonical spelling (Clarissa) and update all occurrences.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 12 | E12.33 | 00:46.70 | My emerald signet ring fell deep into the frozen blackthorn briars at Ashworth Manor. | ✓ |
| 31 | E31.28 | 00:51.00 | Everyone saw you. Everyone watched him chose Clarisse. | ✓ |

## C008 · [medium] Multiple spelling variants for Ashburg estate
_name_drift · found by ai · impact: subtitle_

The ducal seat is spelled in numerous ways across the series including Ashburg, Ashbury, Ashburton, Ashbourne, Ashburgh, and Ashburn.

**Fix:** Consolidate all references to the estate under one canonical spelling in the script and subtitles.

| Ep | Beat | Time | Evidence | ✓ |
|---|---|---|---|---|
| 19 | E19.29 | 00:47.10 | Tell me what is happening in Ashburg. | ✓ |
| 20 | E20.14 | 00:21.30 | Once my cousin Alexander's death is formally sealed by the Crown... | ✓ |

## Story bible (canonical names for the pipeline)

| Canonical | Aliases | Speaker labels | Role |
|---|---|---|---|
| Lady Juliana Ashcroft | Juliana, Julian, Miss Ashcroft, The healer, The maid, Lady Juliana, Duchess of Ashburton | LADY JULIANA, JULIANA | Protagonist, healer, wife of Alexander |
| Alexander Ashburn | Alexander, Alexander Ashwin, Alexander Ashburton, Your husband, Your Grace, soldier, cousin Alexander, The scarred soldier, Rightful Duke of Ashburn | ALEXANDER, MYSTERIOUS BEARDED MAN, THE FORMER GROOM, THE BEARDED STRANGER | True Lord of Ashbury / Duke of Ashburn, veteran |
| Clarissa | Clarisse, Lady Clarissa, sister | CLARISSA, LADY CLARISSA | Juliana's sister |
| Catherine | Lady Catherine, Lady Catherine Ashbridge, Catherine Ashbridge, Duchess of Ashburgh | CATHERINE, LADY CATHERINE, LADY IN GOLD GOWN | Antagonist, initially Rupert's partner/wife, later scullery maid |
| Rupert | Lord Rupert Ashburn, Lord Sterling, Blond Nobleman, ignored cousin | RUPERT, BLOND NOBLEMAN, CROWN OFFICIAL | Usurper, antagonist, groom |
| Dowager Duchess | Her Grace, The Duchess, The old woman, Alexander's Mother, Alexander's elderly mother, LADY ASHBOURNE | DOWAGER DUCHESS, MATRIARCH, NOBLE MATRIARCH | Mother of Alexander |
| Prudence | young maid, MAID | PRUDENCE, MAID | Maid, Toby's sister |
| Toby | seven-year-old brother | TOBY | Prudence's younger brother |
| Gerald | Gerald Harrington, Lord Harrington | GERALD, LORD HARRINGTON | Antagonist, former fiancé of Juliana |
| Father Thomas | High Priest, PRIEST | HIGH PRIEST, THE PRIEST, FATHER THOMAS | Clergyman, co-conspirator with Catherine |

| Place | Variants |
|---|---|
| Ashbourne Manor | Ashbury, Ashburg, Ashburton Manor, Ashbrook, Ashwood, Ashbridge Manor, Ashbridge |
| Cathedral | church, chapel, grand cathedral, sanctuary |
| Dungeon | wet cells, cellar, stone dungeon, undercroft cells |
| Cottage | our home, home |
| Blackwood | the village |

| Object | Variants |
|---|---|
| Mother's Herbal Ledger | mother's book, leather-bound herbal ledger, mother's remedy journal, herbarium, book of weeds, botanical book, forbidden book, scorched leather-bound herbal |
| Signet Ring | emerald signet ring, ring, wedding ring |
| Gold Pocket Watch | watch |
| War Office Dossier | dossier stamped 'WAR OFFICE - TOP SECRET', documents |