# Promo Finder — evaluation against gold moments

Gold: 12 must-have moments in 8 episodes (tests/promo_gold.json).

## rules-only — `outputs\p1\rules\promos.json`

**Recall (any promo): 11/12 · Recall (top-3 per episode): 11/12 · Starts within 3s of the moment: 2/11 · In the posting order: 2**

| Gold | Found (coverage) | In top 3 | Start offset | Posted | Moment |
|---|---|---|---|---|---|
| E1-A | ✅ P015 (99%) | ✅ | 4.9s |  | Juliana reaches the altar: 'Why are you holding her hand?' / 'Because  |
| E1-B | ✅ P011 (100%) | ✅ | 0.0s | ✅ | Family rejects her: 'You have embarrassed this family' ... 'the true j |
| E3-A | ✅ P024 (93%) | ✅ | -2.0s |  | 'Guards! Remove her!' - she is dragged - the bearded stranger drops a  |
| E3-B | ✅ P037 (80%) | ✅ | -34.6s |  | The stranger kneels with a ring: 'Lady Juliana... accept my hand.' (ep |
| E5-A | ✅ P001 (82%) | ✅ | 13.0s | ✅ | Stepmother flings her late mother's ledger into the mud; husband: 'Cho |
| E12-A | ✅ P032 (89%) | ✅ | 36.5s |  | 'You planted it!' - Clarissa's ultimatum: crawl into frozen thorns bar |
| E24-A | ✅ P073 (100%) | ✅ | 5.8s |  | 'Then let her suffer.' - riding-crop strike - 'Perhaps when your hands |
| E27-A | ✅ P027 (68%) | ✅ | 8.2s |  | Duchess: 'My lost son wore that exact ring!' 'What is your husband's n |
| E27-B | ✅ P014 (87%) | ✅ | 14.8s |  | 'It is an antidote.' 'To what?' 'Poison.' - framed: 'She admits...' -  |
| E41-A | ✅ P093 (87%) | ✅ | 16.6s |  | Chained Juliana paraded at the villains' wedding - the cathedral doors |
| E45-A | ❌ best 0% | ❌ | — |  | Identity reveal: 'It's you.' 'You're the Duke?' 'Alexander Ashburton.  |
| E45-B | ✅ P067 (95%) | ✅ | 9.6s |  | '...my lawful wife and the Duchess' - High Priest bursts in: 'You are  |

## ai+rules · gemini-3.5-flash-lite — `outputs\p1\ai_v1_before_fix\promos.json`

**Recall (any promo): 12/12 · Recall (top-3 per episode): 11/12 · Starts within 3s of the moment: 4/12 · In the posting order: 3**

| Gold | Found (coverage) | In top 3 | Start offset | Posted | Moment |
|---|---|---|---|---|---|
| E1-A | ✅ P014 (99%) | ✅ | 5.0s | ✅ | Juliana reaches the altar: 'Why are you holding her hand?' / 'Because  |
| E1-B | ✅ P009 (100%) | ✅ | -0.3s |  | Family rejects her: 'You have embarrassed this family' ... 'the true j |
| E3-A | ✅ P003 (93%) | ✅ | -2.0s |  | 'Guards! Remove her!' - she is dragged - the bearded stranger drops a  |
| E3-B | ✅ P050 (80%) | ✅ | -9.2s |  | The stranger kneels with a ring: 'Lady Juliana... accept my hand.' (ep |
| E5-A | ✅ P010 (91%) | ✅ | 11.7s |  | Stepmother flings her late mother's ledger into the mud; husband: 'Cho |
| E12-A | ✅ P004 (100%) | ✅ | 19.6s |  | 'You planted it!' - Clarissa's ultimatum: crawl into frozen thorns bar |
| E24-A | ✅ P101 (99%) | ✅ | -0.3s |  | 'Then let her suffer.' - riding-crop strike - 'Perhaps when your hands |
| E27-A | ✅ P095 (78%) | ❌ | -25.6s |  | Duchess: 'My lost son wore that exact ring!' 'What is your husband's n |
| E27-B | ✅ P018 (87%) | ✅ | 14.5s | ✅ | 'It is an antidote.' 'To what?' 'Poison.' - framed: 'She admits...' -  |
| E41-A | ✅ P012 (87%) | ✅ | 16.7s | ✅ | Chained Juliana paraded at the villains' wedding - the cathedral doors |
| E45-A | ✅ P028 (100%) | ✅ | -2.6s |  | Identity reveal: 'It's you.' 'You're the Duke?' 'Alexander Ashburton.  |
| E45-B | ✅ P039 (100%) | ✅ | 14.7s |  | '...my lawful wife and the Duchess' - High Priest bursts in: 'You are  |

## ai+rules · gemini-3.5-flash-lite — `outputs\p1\ai_v2_silent_drop_bug\promos.json`

**Recall (any promo): 9/12 · Recall (top-3 per episode): 9/12 · Starts within 3s of the moment: 3/9 · In the posting order: 4**

| Gold | Found (coverage) | In top 3 | Start offset | Posted | Moment |
|---|---|---|---|---|---|
| E1-A | ❌ best — | ❌ | — |  | Juliana reaches the altar: 'Why are you holding her hand?' / 'Because  |
| E1-B | ❌ best — | ❌ | — |  | Family rejects her: 'You have embarrassed this family' ... 'the true j |
| E3-A | ✅ P003 (93%) | ✅ | -2.0s |  | 'Guards! Remove her!' - she is dragged - the bearded stranger drops a  |
| E3-B | ✅ P030 (100%) | ✅ | -9.2s |  | The stranger kneels with a ring: 'Lady Juliana... accept my hand.' (ep |
| E5-A | ❌ best — | ❌ | — |  | Stepmother flings her late mother's ledger into the mud; husband: 'Cho |
| E12-A | ✅ P008 (100%) | ✅ | 19.6s | ✅ | 'You planted it!' - Clarissa's ultimatum: crawl into frozen thorns bar |
| E24-A | ✅ P060 (100%) | ✅ | 5.9s | ✅ | 'Then let her suffer.' - riding-crop strike - 'Perhaps when your hands |
| E27-A | ✅ P070 (98%) | ✅ | -9.7s |  | Duchess: 'My lost son wore that exact ring!' 'What is your husband's n |
| E27-B | ✅ P002 (87%) | ✅ | 14.5s | ✅ | 'It is an antidote.' 'To what?' 'Poison.' - framed: 'She admits...' -  |
| E41-A | ✅ P022 (87%) | ✅ | 16.7s | ✅ | Chained Juliana paraded at the villains' wedding - the cathedral doors |
| E45-A | ✅ P084 (100%) | ✅ | -2.6s |  | Identity reveal: 'It's you.' 'You're the Duke?' 'Alexander Ashburton.  |
| E45-B | ✅ P043 (100%) | ✅ | 3.0s |  | '...my lawful wife and the Duchess' - High Priest bursts in: 'You are  |

## ai+rules · gemini-3.5-flash-lite — `outputs\p1\ai\promos.json`

**Recall (any promo): 10/12 · Recall (top-3 per episode): 10/12 · Starts within 3s of the moment: 2/10 · In the posting order: 3**

| Gold | Found (coverage) | In top 3 | Start offset | Posted | Moment |
|---|---|---|---|---|---|
| E1-A | ✅ P004 (100%) | ✅ | 5.0s |  | Juliana reaches the altar: 'Why are you holding her hand?' / 'Because  |
| E1-B | ✅ P005 (100%) | ✅ | -0.3s |  | Family rejects her: 'You have embarrassed this family' ... 'the true j |
| E3-A | ✅ P022 (100%) | ✅ | 11.3s | ✅ | 'Guards! Remove her!' - she is dragged - the bearded stranger drops a  |
| E3-B | ❌ best 0% | ❌ | — |  | The stranger kneels with a ring: 'Lady Juliana... accept my hand.' (ep |
| E5-A | ✅ P006 (100%) | ✅ | 11.7s | ✅ | Stepmother flings her late mother's ledger into the mud; husband: 'Cho |
| E12-A | ✅ P010 (100%) | ✅ | 15.1s |  | 'You planted it!' - Clarissa's ultimatum: crawl into frozen thorns bar |
| E24-A | ✅ P075 (98%) | ✅ | 24.2s |  | 'Then let her suffer.' - riding-crop strike - 'Perhaps when your hands |
| E27-A | ✅ P087 (78%) | ✅ | -25.6s |  | Duchess: 'My lost son wore that exact ring!' 'What is your husband's n |
| E27-B | ✅ P034 (89%) | ✅ | 11.8s |  | 'It is an antidote.' 'To what?' 'Poison.' - framed: 'She admits...' -  |
| E41-A | ✅ P031 (87%) | ✅ | 16.7s | ✅ | Chained Juliana paraded at the villains' wedding - the cathedral doors |
| E45-A | ❌ best 12% | ❌ | — |  | Identity reveal: 'It's you.' 'You're the Duke?' 'Alexander Ashburton.  |
| E45-B | ✅ P046 (100%) | ✅ | 3.0s |  | '...my lawful wife and the Duchess' - High Priest bursts in: 'You are  |
