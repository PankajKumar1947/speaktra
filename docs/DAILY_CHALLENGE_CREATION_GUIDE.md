# Daily Challenge Creation Guide

## Overview

A Daily Challenge is a curated collection of learning materials (vocabularies, sentences, and articles) organized by domain, difficulty, and level. It serves as a structured daily practice session for users.

## Entity Relationship

```
Daily Challenge
├── sequenceNumber (unique)
├── domain (required)
├── difficulty (required)
├── level (required)
├── vocabularies[] (optional - references to Vocabulary documents)
├── sentences[] (optional - references to Sentence documents)
└── articles[] (optional - references to Article documents)
```

## Recommended Creation Order

### **Content-First Approach (Recommended)**

Create all content materials first, then organize them into a Daily Challenge.

```
1. Select existing Domain (predefined)
   ↓
2. Create Vocabularies (linked to domain)
   ↓
3. Create Sentences (linked to domain)
   ↓
4. Create Articles (linked to domain)
   ↓
5. Create Daily Challenge (pass domain_id + reference all content)
```

**Advantages:**

- Content is reusable across multiple daily challenges
- Can curate daily challenges from existing content library
- Better for maintaining content quality independently
- Easier to update individual items without affecting challenges
- Uses predefined domains - no need to create new ones

**When to use:**

- Building daily challenges from existing content library
- You have existing vocabulary, sentences, and articles to organize
- Reusing predefined domains across multiple challenges

---

## Detailed API Workflow

### Step 1: Get/Verify Predefined Domain ID

```bash
GET /domain
# Response: Get list of predefined domains
# Example: domain_id = "507f1f77bcf86cd799439011"
```

### Step 2a: Create Vocabulary (Optional)

```bash
POST /vocabulary
{
  "word": "conference",
  "definition": "A meeting of people to discuss a particular topic",
  "example": "We have a team conference every Monday",
  "domain": "domain_id",
  "difficulty": "easy"
}
# Response: { id: "vocab_id_1", ... }
```

### Step 2b: Create Sentences (Optional)

```bash
POST /sentence
{
  "sentence": "Let's schedule a meeting to discuss the project",
  "translation": "[translation in target language]",
  "context": "workplace",
  "domain": "domain_id",
  "difficulty": "medium"
}
# Response: { id: "sentence_id_1", ... }
```

### Step 2c: Create Articles (Optional)

```bash
POST /article
{
  "type": "reading",
  "title": "Effective Business Writing",
  "minRead": 5,
  "domainId": "domain_id",
  "difficulty": "medium",
  "description": "Learn the essentials of professional writing",
  "keywords": ["writing", "business", "communication"]
}
# Response: { id: "article_id_1", ... }
```

### Step 3: Create Daily Challenge

```bash
POST /daily-challenge
{
  "sequenceNumber": 1,
  "domain": "domain_id",
  "difficulty": "easy",
  "level": "beginner",
  "vocabularies": ["vocab_id_1", "vocab_id_2"],
  "sentences": ["sentence_id_1"],
  "articles": ["article_id_1"]
}
# Response: { id: "challenge_id", ... }
```

---

## Field Requirements

### Required Fields for Daily Challenge

| Field            | Type     | Constraints                      | Description                    |
| ---------------- | -------- | -------------------------------- | ------------------------------ |
| `sequenceNumber` | number   | unique, positive                 | Order in sequence (1, 2, 3...) |
| `domain`         | ObjectId | valid MongoDB ObjectId           | Reference to Domain            |
| `difficulty`     | enum     | easy, medium, hard               | Challenge difficulty level     |
| `level`          | enum     | beginner, intermediate, advanced | Proficiency level              |

### Optional Fields for Daily Challenge

| Field          | Type       | Description                         |
| -------------- | ---------- | ----------------------------------- |
| `vocabularies` | ObjectId[] | Array of Vocabulary IDs (0 or more) |
| `sentences`    | ObjectId[] | Array of Sentence IDs (0 or more)   |
| `articles`     | ObjectId[] | Array of Article IDs (0 or more)    |

---

## Validation Rules

1. **sequenceNumber**: Must be unique. Cannot have duplicate sequence numbers in same domain.
2. **domain**: Must reference an existing Domain document.
3. **difficulty**: Must be one of: `easy`, `medium`, `hard`
4. **level**: Must be one of: `beginner`, `intermediate`, `advanced`
5. **Content References**: All vocabulary, sentence, and article IDs must reference existing documents.

---

## Best Practices

### ✅ Do:

- **Use predefined domains** - select from existing domains during challenge setup
- Create a **diverse mix** of vocabularies, sentences, and articles in each challenge
- Keep **sequenceNumber incremental** (1, 2, 3...) for easy tracking
- **Reuse content** across multiple daily challenges with the same domain
- **Match difficulty and level** consistency across linked content
- **Validate ObjectIds** before linking to ensure they exist

### ❌ Don't:

- Create new domains for each challenge - reuse predefined domains
- Create duplicate sequence numbers in the same challenge set
- Link to non-existent content (will cause reference errors)
- Mix inconsistent difficulty levels (easy challenge with hard content)
- Create empty challenges with no content (not useful for learners)

---

## Example: Complete Daily Challenge #1

```bash
# 1. Get existing predefined Domain
GET /domain
# → gets: domain_id = "507f1f77bcf86cd799439011"

# 2. Create 3 Vocabularies (linked to domain)
POST /vocabulary
{
  "word": "conference",
  "domain": "507f1f77bcf86cd799439011"
}
# → vocab_id_1

POST /vocabulary → vocab_id_2
POST /vocabulary → vocab_id_3

# 3. Create 2 Sentences (linked to domain)
POST /sentence
{
  "sentence": "Let's schedule a meeting",
  "domain": "507f1f77bcf86cd799439011"
}
# → sentence_id_1

POST /sentence → sentence_id_2

# 4. Create 1 Article (linked to domain)
POST /article
{
  "title": "Business Writing",
  "domainId": "507f1f77bcf86cd799439011"
}
# → article_id_1

# 5. Create Daily Challenge with existing domain and all references
POST /daily-challenge
{
  "sequenceNumber": 1,
  "domain": "507f1f77bcf86cd799439011",
  "difficulty": "easy",
  "level": "beginner",
  "vocabularies": ["vocab_id_1", "vocab_id_2", "vocab_id_3"],
  "sentences": ["sentence_id_1", "sentence_id_2"],
  "articles": ["article_id_1"]
}
```

---

## Update Operations

### Add more content to existing challenge:

```bash
PATCH /daily-challenge/{id}
{
  "vocabularies": [...existing, new_vocab_id],
  "sentences": [...existing, new_sentence_id]
}
```

### Change challenge properties:

```bash
PATCH /daily-challenge/{id}
{
  "difficulty": "medium",
  "level": "intermediate"
}
```

---

## Recovery: Lost Context During Content Creation

**Scenario:** Vocabularies and Sentences created successfully, but Article creation failed and context was lost.

### How to Recover

#### 1. **Query Created Vocabularies & Sentences**

```bash
# Get all vocabularies for a specific domain
GET /vocabulary?domain={domain_id}&difficulty=easy

# Response example:
{
  "data": [
    { "id": "vocab_id_1", "word": "conference", "domain": "domain_id" },
    { "id": "vocab_id_2", "word": "meeting", "domain": "domain_id" },
    { "id": "vocab_id_3", "word": "schedule", "domain": "domain_id" }
  ]
}

# Get all sentences for the same domain
GET /sentence?domain={domain_id}&difficulty=easy

# Response example:
{
  "data": [
    { "id": "sentence_id_1", "sentence": "Let's schedule...", "domain": "domain_id" },
    { "id": "sentence_id_2", "sentence": "The conference...", "domain": "domain_id" }
  ]
}
```

#### 2. **Record/Save the IDs**

Create a temporary tracking note with:

```json
{
  "status": "partial",
  "domain_id": "507f1f77bcf86cd799439011",
  "difficulty": "easy",
  "level": "beginner",
  "created_vocabularies": ["vocab_id_1", "vocab_id_2", "vocab_id_3"],
  "created_sentences": ["sentence_id_1", "sentence_id_2"],
  "next_step": "create articles or proceed with challenge"
}
```

#### 3. **Retry Article Creation or Skip**

```bash
# Option A: Retry Article Creation
POST /article
{
  "title": "Business Writing",
  "domainId": "507f1f77bcf86cd799439011",
  "difficulty": "easy"
}
# → article_id_1

# Option B: Proceed Without Articles
# (Skip articles for now, create challenge immediately)
```

#### 4. **Create Daily Challenge with Recovered IDs**

```bash
POST /daily-challenge
{
  "sequenceNumber": 1,
  "domain": "507f1f77bcf86cd799439011",
  "difficulty": "easy",
  "level": "beginner",
  "vocabularies": ["vocab_id_1", "vocab_id_2", "vocab_id_3"],
  "sentences": ["sentence_id_1", "sentence_id_2"],
  "articles": ["article_id_1"]  # With article, or omit if skipped
}
```

---

## Best Practices to Prevent Losing Context

### ✅ **Strategy 1: Save IDs Immediately**

As you create each item, save the ID in a file or notepad:

```
Domain: 507f1f77bcf86cd799439011
Vocabularies Created:
  - vocab_id_1: conference
  - vocab_id_2: meeting
  - vocab_id_3: schedule

Sentences Created:
  - sentence_id_1: Let's schedule...
  - sentence_id_2: The conference...

Articles: (pending)

Next: Create articles then daily challenge
```

### ✅ **Strategy 2: Use API Response Logging**

Always log/save the response ID from each POST request:

```bash
# Save response immediately
RESPONSE_1=$(curl -X POST /vocabulary ...)
# Extract and store: vocab_id_1 from RESPONSE_1

RESPONSE_2=$(curl -X POST /sentence ...)
# Extract and store: sentence_id_1 from RESPONSE_2
```

### ✅ **Strategy 3: Batch Creation with Tracking**

Create a setup script that tracks all IDs:

```bash
#!/bin/bash

DOMAIN_ID="507f1f77bcf86cd799439011"
TRACKING_FILE="daily_challenge_setup.json"

# Create and track vocabulary
VOCAB_1=$(curl -X POST /vocabulary ... | jq -r '.id')
VOCAB_2=$(curl -X POST /vocabulary ... | jq -r '.id')

# Create and track sentences
SENT_1=$(curl -X POST /sentence ... | jq -r '.id')

# Save tracking file
cat > $TRACKING_FILE << EOF
{
  "domain": "$DOMAIN_ID",
  "vocabularies": ["$VOCAB_1", "$VOCAB_2"],
  "sentences": ["$SENT_1"]
}
EOF

echo "Setup tracked in: $TRACKING_FILE"
```

### ✅ **Strategy 4: Database Query Recovery**

If all else fails, query MongoDB directly to recover IDs:

```bash
# Find all vocabularies created today for a domain
db.vocabularies.find({
  domain: ObjectId("507f1f77bcf86cd799439011"),
  createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) }
})

# Find all sentences for same domain
db.sentences.find({
  domain: ObjectId("507f1f77bcf86cd799439011"),
  createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) }
})
```

---

## Complete Recovery Workflow Example

```
Step 1: Connection Lost During Article Creation (3/5)
├── Vocabularies: ✅ Created (vocab_id_1, vocab_id_2, vocab_id_3)
├── Sentences: ✅ Created (sentence_id_1, sentence_id_2)
├── Articles: ❌ Failed
└── Daily Challenge: ⏳ Pending

Step 2: Recover IDs
├── GET /vocabulary?domain=507f1f77bcf86cd799439011
│   └── Found: vocab_id_1, vocab_id_2, vocab_id_3
│
├── GET /sentence?domain=507f1f77bcf86cd799439011
│   └── Found: sentence_id_1, sentence_id_2
│
└── Save to tracking file
    {
      "vocabularies": ["vocab_id_1", "vocab_id_2", "vocab_id_3"],
      "sentences": ["sentence_id_1", "sentence_id_2"]
    }

Step 3: Option A - Retry Articles
├── POST /article → article_id_1 ✅ Success
└── Add to tracking: "articles": ["article_id_1"]

Step 3: Option B - Skip Articles
└── Proceed with challenge using only vocab + sentences

Step 4: Create Daily Challenge
└── POST /daily-challenge
    {
      "domain": "507f1f77bcf86cd799439011",
      "sequenceNumber": 1,
      "difficulty": "easy",
      "level": "beginner",
      "vocabularies": ["vocab_id_1", "vocab_id_2", "vocab_id_3"],
      "sentences": ["sentence_id_1", "sentence_id_2"],
      "articles": ["article_id_1"]  // optional
    }
    ✅ Daily Challenge Created!
```

---

## Data Safety Considerations

| Scenario                            | Risk                        | Mitigation                                       |
| ----------------------------------- | --------------------------- | ------------------------------------------------ |
| Lost context after partial creation | Orphaned content not linked | Query by domain + date to recover                |
| Duplicate creation on retry         | Same content created twice  | Check existing before creating                   |
| Inconsistent state                  | Mismatched IDs in challenge | Always query to verify before creating challenge |
| No articles created                 | Challenge incomplete        | Design accepts optional articles                 |

---

## Automated AI Content Generation

> **For detailed AI-driven content generation strategy, de-duplication, scheduling, and implementation, see:**
> 📄 **[AI_CONTENT_GENERATION_PLAN.md](AI_CONTENT_GENERATION_PLAN.md)**

This plan covers:

- Architecture for 24-hour pre-generation of daily challenges
- Avoiding duplicates using hash + semantic similarity
- Building on previous content via "memory windows"
- Efficient batch generation with single AI calls
- Retry strategies, monitoring, and error handling

**Quick Timeline:**

```
T-24h: Scheduler triggers → AI generates content → Creates daily challenge
T-0h:  Daily challenge goes LIVE to users
```

**TL;DR:**

- **Use Predefined Domains**: Select an existing domain (no need to create new ones)
- **Then Create**: Vocabularies → Sentences → Articles (linked to domain)
- **Finally**: Create Daily Challenge by passing domain_id + all content references
- **Required**: sequenceNumber, domain, difficulty, level
- **Optional**: Any/all of vocabularies, sentences, articles
- **Best Practice**: Curate diverse, balanced daily challenges from your content library using predefined domains
