# JCCC HRIS Database Schema Design Document

**Version:** 1.0  
**Date:** 2025-12-02  
**Purpose:** Complete database schema specification for JCCC HR Information System

---

## Table of Contents

1. [Overview](#overview)
2. [Access Control Model](#access-control-model)
3. [Core Tables](#core-tables)
4. [Reference Data Tables](#reference-data-tables)
5. [Field Specifications](#field-specifications)
6. [Relationships](#relationships)
7. [Computed Fields](#computed-fields)
8. [Migration Strategy](#migration-strategy)

---

## Overview

### System Context

The JCCC HRIS is an internal system for managing employee information across a missions organization with staff from multiple countries working in Japan. The system implements a 5-tier access control model (L5 to L1) that restricts information depth rather than scope.

### Key Design Principles

- **Database-first approach**: Schema is the source of truth
- **Type safety**: Generate TypeScript types from schema
- **Access control at query level**: Not just UI restrictions
- **Multilingual support**: Japanese field names in DB, multilingual labels in UI
- **Real data from day 1**: No mock data
- **Incremental delivery**: Build L5 completely before moving to L4

### Technology Stack

- **Database**: SQLite (for POC, designed to be portable to PostgreSQL)
- **Framework**: SvelteKit
- **Type Generation**: Prisma or Kysely for type-safe queries

---

## Access Control Model

### Tiers (L5 → L1, decreasing accessibility)

| Tier | Name (JP) | Name (EN) | Who Has Access | Scope |
|------|---------------|--------------|---------|
| **L5** | プロフィール | Basic Profile | All staff | Public organizational info (visible to all staff) |
| **L4** | ミニストリー歴 | Ministry History | Team Leaders+ | Training & experience history |
| **L3** | 在籍情報 | Employment Records | HR/Operations+ | Employment details, visa info |
| **L2** | 個人情報 | Personal Information | HR/Operations+ | Private personal data, family, emergency contacts |
| **L1** | 給与情報 | Salary Information | National Leadership Team and HR/Operations Leaders only | Compensation details (most restricted) |

### User Roles & Access

| Role | Japanese | Access Levels | Edit Permissions |
|------|----------|---------------|------------------|
| General Staff | 一般スタッフ | L5 only | Own L5 profile (limited fields) |
| Team Leader | チームリーダー | L5 + L4 | Own L5 + L4, view team members' L5 + L4 |
| HR/Operations | HR/Operations | L5 + L4 + L3 + L2 | Full edit on L5-L2 for all staff |
| Leadership | 幹部 | All (L5 through L1) | Full edit on all levels |

---

### Tier Definitions

| Tier | Name (JP) | Name (EN) | Who Has Access | Scope |
|------|-----------|-----------|----------------|-------|
| **L5** | プロフィール | Basic Profile | All staff | Public organizational info |
| **L4** | ミニストリー歴 | Ministry History | Team Leaders+ | Training & experience |
| **L3** | 在籍情報 | Employment Records | HR/Operations+ | Employment details |
| **L2** | 個人情報 | Personal Information | HR/Operations+ | Private personal data |
| **L1** | 給与情報 | Salary Information | Leadership only | Compensation |

### User Roles

```typescript
enum UserRole {
  GENERAL_STAFF = 'general_staff',      // 一般スタッフ - L5 only
  TEAM_LEADER = 'team_leader',          // チームリーダー - L5 + L4
  HR_OPERATIONS = 'hr_operations',      // HR/Operations - L5 + L4 + L3 + L2
  LEADERSHIP = 'leadership'             // 幹部 - All levels L5 through L1
}
```

### Edit Permissions

- **General Staff**: Can edit only their own L5 profile (limited fields)
- **Team Leaders**: Can edit their own L5 + L4, view team members' L5 + L4
- **HR/Operations**: Full edit on L5-L2 for all staff
- **Leadership**: Full edit on all levels including L1

---

## Core Tables

### 1. `employees` (Core Employee Data)

**Purpose**: Single source of truth for each employee's core information across all access levels.

```sql
CREATE TABLE employees (
  -- System metadata
  id TEXT PRIMARY KEY,                    -- UUID
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by_user_id TEXT NOT NULL,
  updated_by_user_id TEXT NOT NULL,
  
  -- =====================================
  -- L5: BASIC PROFILE FIELDS
  -- =====================================
  
  -- Photo
  photo_url TEXT,                         -- 写真 - URL to uploaded image
  
  -- Names (passport notation)
  name_passport_family TEXT NOT NULL,     -- 姓 Last/Family Name
  name_passport_middle TEXT,              -- ミドルネーム Middle Name
  name_passport_given TEXT NOT NULL,      -- 名 First Name
  
  -- Names (Japanese notation)
  name_japanese_family TEXT,              -- 姓 Last/Family Name (漢字/カタカナ)
  name_japanese_given TEXT,               -- 名 First Name (漢字/カタカナ)
  
  -- Nickname
  nickname TEXT,                          -- ニックネーム・通称名 Nickname / Alias
  
  -- Basic demographics (L5 visible)
  gender TEXT NOT NULL CHECK(gender IN ('男/M', '女/F')),  -- 性別 Gender
  
  -- Organizational identity
  status TEXT NOT NULL,                   -- ステータス Status (FK to ref_statuses)
  current_mcc TEXT,                       -- 現在のMCC Current MCC (FK to ref_mccs)
  team_primary TEXT,                      -- 所属チーム(1) Primary Team (FK to ref_teams)
  team_secondary TEXT,                    -- 所属チーム(2) Secondary Team (FK to ref_teams)
  
  -- Location (L5 - city level only)
  residential_area TEXT,                  -- 居住地域 City/Area (FK to ref_residential_areas)
  
  -- Contact (L5 visible)
  email TEXT NOT NULL,                    -- 電子メール Email
  phone TEXT NOT NULL,                    -- 携帯電話番号 Cell phone
  
  -- Training credential (L5 visible)
  nst_gctc_completion_year INTEGER,       -- NST(GCTC)の卒業年 Year completed
  
  -- =====================================
  -- L3: EMPLOYMENT RECORDS
  -- =====================================
  
  -- Demographics (L3 restricted)
  date_of_birth DATE NOT NULL,            -- 生年月日 Date of Birth
  nationality TEXT NOT NULL,              -- 国籍 Nationality
  
  -- Sending organization
  sending_ccc_country TEXT NOT NULL,      -- 所属国(Cru/CCC) Country (FK to ref_sending_ccc_countries)
  sending_ccc_origin TEXT NOT NULL,       -- 派遣元CCC Origin office (FK to ref_sending_ccc_origins)
  
  -- Employment timeline
  joined_fulltime_staff_date DATE NOT NULL,  -- 常勤入社日 Date joined full-time in sending CCC
  japan_entry_date DATE NOT NULL,         -- 入国月日 Date of entry to Japan
  
  -- Separation (if applicable)
  separation_date DATE,                   -- 退職または配置転換 Date
  separation_reason TEXT,                 -- 事由 Reason
  
  -- =====================================
  -- L2: PERSONAL INFORMATION
  -- =====================================
  
  -- Full address (L2 restricted, not just city)
  address_full TEXT,                      -- 住所 Full address
  
  -- Family information
  marital_status TEXT NOT NULL,           -- 婚姻状況 (FK to ref_marital_statuses)
  children_count INTEGER DEFAULT 0,       -- 子ども Number of children
  
  -- Emergency contact 1 (required)
  emergency_contact_1_name TEXT NOT NULL,        -- 名前 Name
  emergency_contact_1_relationship TEXT NOT NULL, -- 関係 Relationship
  emergency_contact_1_phone TEXT NOT NULL,       -- 電話番号 Phone
  emergency_contact_1_email TEXT,                -- メールアドレス Email
  
  -- Emergency contact 2 (optional)
  emergency_contact_2_name TEXT,
  emergency_contact_2_relationship TEXT,
  emergency_contact_2_phone TEXT,
  emergency_contact_2_email TEXT,
  
  -- General notes
  remarks TEXT,                           -- 備考 Remarks (free text)
  
  -- =====================================
  -- L1: SALARY & COMPENSATION
  -- =====================================
  -- (To be added in future phase)
  
  -- Indexes for common queries
  FOREIGN KEY (created_by_user_id) REFERENCES users(id),
  FOREIGN KEY (updated_by_user_id) REFERENCES users(id)
);

-- Indexes for performance
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_employees_current_mcc ON employees(current_mcc);
CREATE INDEX idx_employees_team_primary ON employees(team_primary);
CREATE INDEX idx_employees_residential_area ON employees(residential_area);
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_separation_date ON employees(separation_date);
```

### 2. `ministry_history` (L4: Position History)

**Purpose**: Track all ministry positions an employee has held over time.

```sql
CREATE TABLE ministry_history (
  id TEXT PRIMARY KEY,                    -- UUID
  employee_id TEXT NOT NULL,              -- FK to employees
  
  -- Date range
  start_year INTEGER NOT NULL,            -- 開始 年
  start_month INTEGER NOT NULL,           -- 開始 月
  start_day INTEGER NOT NULL,             -- 開始 日
  end_year INTEGER,                       -- 終了 年
  end_month INTEGER,                      -- 終了 月
  end_day INTEGER,                        -- 終了 日
  
  -- Position details
  mcc TEXT NOT NULL,                      -- 所属MCC (FK to ref_mccs)
  team TEXT NOT NULL,                     -- 所属チーム (FK to ref_teams)
  position TEXT NOT NULL,                 -- ポジション (FK to ref_positions)
  
  -- Metadata
  is_current BOOLEAN GENERATED ALWAYS AS (end_year IS NULL) STORED,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
  CHECK (start_year >= 1900 AND start_year <= 2100),
  CHECK (start_month >= 1 AND start_month <= 12),
  CHECK (start_day >= 1 AND start_day <= 31)
);

CREATE INDEX idx_ministry_history_employee ON ministry_history(employee_id);
CREATE INDEX idx_ministry_history_current ON ministry_history(is_current);
CREATE INDEX idx_ministry_history_mcc ON ministry_history(mcc);
CREATE INDEX idx_ministry_history_team ON ministry_history(team);
```

### 3. `mission_trips` (L4: Short-term Ministry)

**Purpose**: Track short-term mission trip participation.

```sql
CREATE TABLE mission_trips (
  id TEXT PRIMARY KEY,                    -- UUID
  employee_id TEXT NOT NULL,              -- FK to employees
  
  -- Date range (always has end date)
  start_year INTEGER NOT NULL,            -- 開始 年
  start_month INTEGER NOT NULL,           -- 開始 月
  start_day INTEGER NOT NULL,             -- 開始 日
  end_year INTEGER NOT NULL,              -- 終了 年
  end_month INTEGER NOT NULL,             -- 終了 月
  end_day INTEGER NOT NULL,               -- 終了 日
  
  -- Trip details
  location TEXT NOT NULL,                 -- 場所 Location
  position TEXT NOT NULL,                 -- ポジション Role/Position
  
  -- Metadata
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
  CHECK (start_year >= 1900 AND start_year <= 2100),
  CHECK (end_year >= start_year)
);

CREATE INDEX idx_mission_trips_employee ON mission_trips(employee_id);
```

### 4. `ibs_courses` (L4: IBS Training)

**Purpose**: Track Integrated Bible Study course completion.

```sql
CREATE TABLE ibs_courses (
  id TEXT PRIMARY KEY,                    -- UUID
  employee_id TEXT NOT NULL,              -- FK to employees
  
  -- Date range
  start_year INTEGER NOT NULL,            -- 開始 年
  start_month INTEGER NOT NULL,           -- 開始 月
  start_day INTEGER NOT NULL,             -- 開始 日
  end_year INTEGER NOT NULL,              -- 終了 年
  end_month INTEGER NOT NULL,             -- 終了 月
  end_day INTEGER NOT NULL,               -- 終了 日
  
  -- Course details
  class_name TEXT NOT NULL,               -- クラス名 (FK to ref_ibs_courses)
  credit_type TEXT NOT NULL CHECK(credit_type IN ('単位取得', '聴講')),  -- Credit or Audit
  
  -- Metadata
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
  CHECK (start_year >= 1900 AND start_year <= 2100)
);

CREATE INDEX idx_ibs_courses_employee ON ibs_courses(employee_id);
CREATE INDEX idx_ibs_courses_class ON ibs_courses(class_name);
```

### 5. `seminary_education` (L4: Seminary Degrees)

**Purpose**: Track seminary and theological education.

```sql
CREATE TABLE seminary_education (
  id TEXT PRIMARY KEY,                    -- UUID
  employee_id TEXT NOT NULL,              -- FK to employees
  
  -- Date range
  start_year INTEGER NOT NULL,            -- 開始 年
  start_month INTEGER NOT NULL,           -- 開始 月
  start_day INTEGER NOT NULL,             -- 開始 日
  end_year INTEGER NOT NULL,              -- 終了 年
  end_month INTEGER NOT NULL,             -- 終了 月
  end_day INTEGER NOT NULL,               -- 終了 日
  
  -- Education details
  seminary_name TEXT NOT NULL,            -- 神学校名 Seminary Name
  degree TEXT NOT NULL,                   -- 学位 Degree (e.g., M.Div, D.Min, etc.)
  
  -- Metadata
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
  CHECK (start_year >= 1900 AND start_year <= 2100)
);

CREATE INDEX idx_seminary_education_employee ON seminary_education(employee_id);
```

### 6. `users` (System Users & Authentication)

**Purpose**: System users who can log in and access the HRIS.

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,                    -- UUID
  employee_id TEXT UNIQUE,                -- FK to employees (nullable for system accounts)
  
  -- Authentication
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  
  -- Authorization
  role TEXT NOT NULL CHECK(role IN ('general_staff', 'team_leader', 'hr_operations', 'leadership')),
  
  -- Account status
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login_at TIMESTAMP,
  
  -- Metadata
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_employee ON users(employee_id);
CREATE INDEX idx_users_role ON users(role);
```

---

## Reference Data Tables

### 7. `ref_statuses` (Status Options)

```sql
CREATE TABLE ref_statuses (
  id TEXT PRIMARY KEY,                    -- Key for DB references
  label_ja TEXT NOT NULL,                 -- Japanese label
  label_en TEXT NOT NULL,                 -- English label
  sort_order INTEGER NOT NULL,            -- Display order
  is_active BOOLEAN NOT NULL DEFAULT true -- Can be deactivated without deleting
);

-- Initial data
INSERT INTO ref_statuses (id, label_ja, label_en, sort_order) VALUES
  ('full_time', 'フルタイム/Full-time', 'Full-time', 1),
  ('stinter', 'スティンター/Stinter', 'Stinter', 2),
  ('staff_stinter', 'スタッフ・スティンター/Staff Stinter', 'Staff Stinter', 3),
  ('part_time', 'パートタイム/Part-time', 'Part-time', 4),
  ('new_national_staff', '新スタッフ/New National Staff', 'New National Staff', 5),
  ('new_ir', '新IR/New IR', 'New IR', 6),
  ('new_ics', '新ICS/New ICS', 'New ICS', 7),
  ('ir', 'IR', 'IR', 8),
  ('ics', 'ICS', 'ICS', 9),
  ('associate', '協カスタッフ/Associate', 'Associate', 10);
```

### 8. `ref_mccs` (Mission Critical Components)

```sql
CREATE TABLE ref_mccs (
  id TEXT PRIMARY KEY,                    -- Key for DB (e.g., 'nlt', 'prayer')
  label_ja TEXT NOT NULL,                 -- Japanese label
  label_en TEXT NOT NULL,                 -- English label
  description TEXT,                       -- Optional description
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Initial data
INSERT INTO ref_mccs (id, label_ja, label_en, sort_order) VALUES
  ('nlt', 'NLT', 'NLT', 1),
  ('prayer', 'Prayer', 'Prayer', 2),
  ('operations', 'オペレーション部門（オフィス）', 'Operations (Office)', 3),
  ('slm', 'SLM', 'SLM', 4),
  ('ds', 'DS', 'DS', 5),
  ('ldhr', 'LDHR', 'LDHR', 6),
  ('training_mpd', '研修・MPD（NST前・配属前）', 'Training/MPD (Pre-NST/Pre-assignment)', 7),
  ('special_ministry', '特別ミニストリー', 'Special Ministry', 8),
  ('jesus_film', 'Jesus Film', 'Jesus Film', 9),
  ('ea_ops', 'EA Ops', 'EA Ops', 10),
  ('mpd_transition', 'MPD途化', 'MPD Transition', 11),
  ('unassigned', '未定', 'Unassigned', 12);
```

### 9. `ref_teams` (Team Options)

```sql
CREATE TABLE ref_teams (
  id TEXT PRIMARY KEY,                    -- Key for DB
  label_ja TEXT NOT NULL,                 -- Japanese label
  label_en TEXT NOT NULL,                 -- English label
  mcc_id TEXT,                           -- FK to ref_mccs (NULL if team exists outside MCC structure)
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  
  FOREIGN KEY (mcc_id) REFERENCES ref_mccs(id)
);

-- Initial data (sample)
INSERT INTO ref_teams (id, label_ja, label_en, mcc_id, sort_order) VALUES
  ('prayer', 'Prayer', 'Prayer', 'prayer', 1),
  ('operations_office', 'オペレーション部門（オフィス）', 'Operations (Office)', 'operations', 2),
  ('slm_national', '全国SLM', 'SLM National', 'slm', 3),
  ('si_sapporo', 'SI札幌', 'SI Sapporo', 'slm', 4),
  ('si_tokyo', 'SI東京', 'SI Tokyo', 'slm', 5),
  ('si_yokohama', 'SI横浜', 'SI Yokohama', 'slm', 6),
  ('si_nagoya', 'SI名古屋', 'SI Nagoya', 'slm', 7),
  ('si_kyoto', 'SI京都', 'SI Kyoto', 'slm', 8),
  ('si_osaka', 'SI大阪', 'SI Osaka', 'slm', 9),
  ('si_kobe', 'SI神戸', 'SI Kobe', 'slm', 10),
  ('si_fukuoka', 'SI福岡', 'SI Fukuoka', 'slm', 11),
  ('ds', 'DS', 'DS', 'ds', 12),
  ('ldhr', 'LDHR', 'LDHR', 'ldhr', 13),
  ('training_mpd_pre', '研修・MPD（NST前・配属前）', 'Training/MPD (Pre-assignment)', 'training_mpd', 14),
  ('crisis_management', '危機管理', 'Crisis Management', NULL, 15),
  ('trt', 'TRT', 'TRT', NULL, 16),
  ('faculty_commons', 'Faculty Commons', 'Faculty Commons', NULL, 17),
  ('jesus_film', 'Jesus Film', 'Jesus Film', 'jesus_film', 18),
  ('ea_ops', 'EA Ops', 'EA Ops', 'ea_ops', 19),
  ('mpd_transition', 'MPD途化', 'MPD Transition', 'mpd_transition', 20),
  ('unassigned', '未定', 'Unassigned', NULL, 21),
  ('other', 'その他', 'Other', NULL, 22),
  ('none', 'なし', 'None', NULL, 23);
```

### 10. `ref_positions` (Position Types)

```sql
CREATE TABLE ref_positions (
  id TEXT PRIMARY KEY,
  label_ja TEXT NOT NULL,
  label_en TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Initial data
INSERT INTO ref_positions (id, label_ja, label_en, sort_order) VALUES
  ('leader', 'リーダー', 'Leader', 1),
  ('deputy_leader', '副リーダー', 'Deputy Leader', 2),
  ('member', 'メンバー', 'Member', 3),
  ('stinter', 'スティンター', 'Stinter', 4),
  ('none', 'なし', 'None', 5);
```

### 11. `ref_residential_areas` (Cities/Regions)

```sql
CREATE TABLE ref_residential_areas (
  id TEXT PRIMARY KEY,
  label_ja TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Initial data
INSERT INTO ref_residential_areas (id, label_ja, sort_order) VALUES
  ('sapporo', '札幌', 1),
  ('tokyo', '東京', 2),
  ('chiba', '千葉', 3),
  ('yokohama', '横浜', 4),
  ('shizuoka', '静岡', 5),
  ('nagoya', '名古屋', 6),
  ('osaka', '大阪', 7),
  ('kyoto', '京都', 8),
  ('kobe', '神戸', 9),
  ('fukuoka', '福岡', 10);
```

### 12. `ref_sending_ccc_countries` (CCC Countries)

```sql
CREATE TABLE ref_sending_ccc_countries (
  id TEXT PRIMARY KEY,
  label_ja TEXT NOT NULL,
  label_en TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Initial data
INSERT INTO ref_sending_ccc_countries (id, label_ja, label_en, sort_order) VALUES
  ('japan', '日本', 'Japan', 1),
  ('usa', 'アメリカ', 'USA', 2),
  ('korea', '韓国', 'Korea', 3),
  ('hong_kong', '香港', 'Hong Kong', 4),
  ('singapore', 'シンガポール', 'Singapore', 5),
  ('mongolia', 'モンゴル', 'Mongolia', 6),
  ('taiwan', '台湾', 'Taiwan', 7);
```

### 13. `ref_sending_ccc_origins` (Specific CCC Offices)

```sql
CREATE TABLE ref_sending_ccc_origins (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  country_id TEXT NOT NULL,              -- FK to ref_sending_ccc_countries
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  
  FOREIGN KEY (country_id) REFERENCES ref_sending_ccc_countries(id)
);

-- Initial data
INSERT INTO ref_sending_ccc_origins (id, label, country_id, sort_order) VALUES
  ('hong_kong', 'Hong Kong', 'hong_kong', 1),
  ('japan', 'Japan', 'japan', 2),
  ('korea', 'Korea', 'korea', 3),
  ('mongolia', 'Mongolia', 'mongolia', 4),
  ('philippines', 'Philippines', 'singapore', 5),
  ('singapore', 'Singapore', 'singapore', 6),
  ('taiwan', 'Taiwan', 'taiwan', 7),
  ('usa', 'USA', 'usa', 8);
```

### 14. `ref_marital_statuses` (Marital Status Options)

```sql
CREATE TABLE ref_marital_statuses (
  id TEXT PRIMARY KEY,
  label_ja TEXT NOT NULL,
  label_en TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Initial data
INSERT INTO ref_marital_statuses (id, label_ja, label_en, sort_order) VALUES
  ('single', '未婚 / Single', 'Single', 1),
  ('married', '既婚 / Married', 'Married', 2),
  ('engaged', '婚約中 / Engaged', 'Engaged', 3);
```

### 15. `ref_ibs_courses` (IBS Course List)

```sql
CREATE TABLE ref_ibs_courses (
  id TEXT PRIMARY KEY,
  label_ja TEXT NOT NULL,
  label_en TEXT NOT NULL,
  is_required BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Initial data (from form)
INSERT INTO ref_ibs_courses (id, label_ja, label_en, is_required, sort_order) VALUES
  ('bible_study_methods', '聖書研究法 (必修)', 'Bible Study Methods (Required)', true, 1),
  ('ot_survey', '旧約通論 (必修)', 'Old Testament Survey (Required)', true, 2),
  ('nt_survey', '新約通論 (必修)', 'New Testament Survey (Required)', true, 3),
  ('bibliology', '聖書論 (必修)', 'Bibliology (Required)', true, 4),
  ('theology_proper', '神論 (必修)', 'Theology Proper (Required)', true, 5),
  ('soteriology_sanctification', '救済論&聖化論 (必修)', 'Soteriology & Sanctification (Required)', true, 6);
```

---

## Field Specifications

### Required Fields (Cannot be NULL)

**For all employees:**
- Names: `name_passport_family`, `name_passport_given`
- Demographics: `gender`, `date_of_birth`, `nationality`
- Status: `status`
- Contact: `email`, `phone`
- Employment: `joined_fulltime_staff_date`, `japan_entry_date`
- Sending: `sending_ccc_country`, `sending_ccc_origin`
- Family: `marital_status` (defaults to 'single')
- Emergency: `emergency_contact_1_name`, `emergency_contact_1_relationship`, `emergency_contact_1_phone`

### Optional Fields

Most other fields are optional to allow for incomplete data during onboarding:
- `photo_url`
- `name_japanese_*` (for non-Japanese staff)
- `nickname`
- `current_mcc` (may be unassigned initially)
- `team_primary`, `team_secondary`
- `residential_area` (if not yet assigned housing)
- `nst_gctc_completion_year`
- `address_full`
- `children_count` (defaults to 0)
- `emergency_contact_2_*`
- `remarks`
- `separation_date`, `separation_reason`

### Field Validations

```typescript
// TypeScript validation examples

// Email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone format (flexible, international)
const phoneRegex = /^[\d\s\-\+\(\)]+$/;

// Date range validations
function validateDateOfBirth(dob: Date): boolean {
  const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return age >= 18 && age <= 100; // Reasonable age range for staff
}

// Children count
const childrenMin = 0;
const childrenMax = 20; // Reasonable maximum

// Year validations
const yearMin = 1900;
const yearMax = 2100;
const monthMin = 1;
const monthMax = 12;
const dayMin = 1;
const dayMax = 31;
```

---

## Relationships

### Entity Relationship Diagram (Textual)

```
users (1) ─────────────────(0..1) employees
                                      │
                                      │ (1)
                                      │
                    ┌─────────────────┼─────────────────────┐
                    │                 │                     │
                    │ (0..*)          │ (0..*)              │ (0..*)
                    │                 │                     │
            ministry_history    mission_trips        ibs_courses
                                                             │
                                                             │ (0..*)
                                                             │
                                                    seminary_education

employees.status ────────> ref_statuses.id
employees.current_mcc ───> ref_mccs.id
employees.team_primary ──> ref_teams.id
employees.team_secondary -> ref_teams.id
employees.residential_area -> ref_residential_areas.id
employees.sending_ccc_country -> ref_sending_ccc_countries.id
employees.sending_ccc_origin -> ref_sending_ccc_origins.id
employees.marital_status -> ref_marital_statuses.id

ministry_history.mcc ────> ref_mccs.id
ministry_history.team ───> ref_teams.id
ministry_history.position > ref_positions.id

ibs_courses.class_name ──> ref_ibs_courses.id

ref_teams.mcc_id ────────> ref_mccs.id (nullable)
ref_sending_ccc_origins.country_id -> ref_sending_ccc_countries.id
```

### Key Relationships

1. **One-to-One**: `users` to `employees` (each system user maps to one employee record, but not all employees are system users)

2. **One-to-Many**: `employees` to historical records
   - One employee has many ministry positions
   - One employee has many mission trips
   - One employee has many IBS courses
   - One employee has many seminary degrees

3. **Many-to-One**: Core tables to reference tables
   - Many employees belong to one status
   - Many employees belong to one MCC
   - Many employees belong to one team

4. **Hierarchical**: `ref_teams` optionally belong to `ref_mccs`
   - Some teams exist within MCC structure
   - Some teams exist outside MCC structure (mcc_id is NULL)

---

## Computed Fields

These fields should be computed at query time, not stored:

### 1. Age (from date_of_birth)

```sql
-- In queries
SELECT 
  *,
  (julianday('now') - julianday(date_of_birth)) / 365.25 AS age
FROM employees;
```

### 2. Tenure (from joined_fulltime_staff_date)

```sql
-- In queries
SELECT 
  *,
  (julianday('now') - julianday(joined_fulltime_staff_date)) / 365.25 AS tenure_years
FROM employees;
```

### 3. Full Name (concatenated)

```sql
-- English full name
SELECT 
  name_passport_given || ' ' || 
  COALESCE(name_passport_middle || ' ', '') || 
  name_passport_family AS full_name_en
FROM employees;

-- Japanese full name
SELECT 
  COALESCE(name_japanese_family, name_passport_family) || ' ' ||
  COALESCE(name_japanese_given, name_passport_given) AS full_name_ja
FROM employees;
```

### 4. Display Name (preferred name or full name)

```sql
SELECT 
  COALESCE(
    nickname,
    name_passport_given || ' ' || name_passport_family
  ) AS display_name
FROM employees;
```

### 5. Current Position (from ministry_history)

```sql
-- Get current position for each employee
SELECT 
  e.*,
  mh.mcc AS current_mcc,
  mh.team AS current_team,
  mh.position AS current_position
FROM employees e
LEFT JOIN ministry_history mh ON e.id = mh.employee_id AND mh.is_current = true;
```

### 6. Is Active (derived from status and separation_date)

```sql
SELECT 
  *,
  (separation_date IS NULL) AS is_active
FROM employees;
```

---

## Migration Strategy

### Phase 1: Core Schema (Sprint 0)

1. Create `users` table
2. Create `employees` table (L5 + L3 + L2 fields only)
3. Create all `ref_*` tables
4. Seed reference data
5. Create basic indexes

**Goal**: Enable CRUD operations for employee profiles.

### Phase 2: Historical Data (Sprint 1-2)

1. Create `ministry_history` table
2. Create `mission_trips` table
3. Add relationships and indexes
4. Import historical data

**Goal**: Enable L4 access - ministry history tracking.

### Phase 3: Training Data (Sprint 3-4)

1. Create `ibs_courses` table
2. Create `seminary_education` table
3. Seed IBS course reference data
4. Add relationships and indexes

**Goal**: Complete L4 access - full training history.

### Phase 4: Compensation (Future)

1. Add L1 fields to `employees` or create separate `compensation` table
2. Implement strictest access controls
3. Add audit logging for all L1 access

**Goal**: Complete all 5 access levels.

### Data Import Considerations

**From existing spreadsheets:**

1. **Clean and validate** all data before import
2. **Normalize** text values (trim whitespace, consistent casing)
3. **Map** existing values to reference table IDs
4. **Handle missing data** with NULL rather than empty strings
5. **Date parsing** from various formats to ISO format
6. **Duplicate detection** on email and name combinations
7. **Audit trail** of what was imported when

**Sample import workflow:**

```typescript
// Pseudocode for import process
async function importEmployee(row: SpreadsheetRow) {
  // 1. Validate required fields
  const validation = validateRequiredFields(row);
  if (!validation.valid) {
    log.error(`Skipping row: ${validation.errors}`);
    return;
  }
  
  // 2. Map reference values to IDs
  const statusId = await lookupStatus(row.status);
  const mccId = await lookupMCC(row.mcc);
  const teamId = await lookupTeam(row.team);
  
  // 3. Parse dates
  const dob = parseDate(row.date_of_birth);
  const joinedDate = parseDate(row.joined_fulltime_staff_date);
  const japanDate = parseDate(row.japan_entry_date);
  
  // 4. Insert employee record
  const employeeId = await db.insert('employees', {
    id: generateUUID(),
    name_passport_family: row.family_name,
    name_passport_given: row.given_name,
    // ... other fields
    created_by_user_id: 'system',
    updated_by_user_id: 'system'
  });
  
  // 5. Insert related records (ministry history, etc.)
  if (row.ministry_history) {
    await importMinistryHistory(employeeId, row.ministry_history);
  }
  
  log.info(`Imported employee: ${employeeId}`);
}
```

---

## Access Control Implementation

### Query-Level Access Control

Access should be enforced at the database query level, not just in the UI.

```typescript
// Example: Get employee data based on user's access level
async function getEmployee(employeeId: string, requestingUserId: string) {
  const requestingUser = await db.users.findUnique({ 
    where: { id: requestingUserId } 
  });
  
  const accessLevel = getUserAccessLevel(requestingUser.role);
  
  // Base query with L5 fields
  let selectFields = {
    // L5 fields
    id: true,
    photo_url: true,
    name_passport_family: true,
    name_passport_given: true,
    name_passport_middle: true,
    name_japanese_family: true,
    name_japanese_given: true,
    nickname: true,
    gender: true,
    status: true,
    current_mcc: true,
    team_primary: true,
    team_secondary: true,
    residential_area: true,
    email: true,
    phone: true,
    nst_gctc_completion_year: true,
  };
  
  // Add L4 fields if authorized
  if (accessLevel >= 4) {
    selectFields = {
      ...selectFields,
      ministry_history: true,
      mission_trips: true,
      ibs_courses: true,
      seminary_education: true,
    };
  }
  
  // Add L3 fields if authorized
  if (accessLevel >= 3) {
    selectFields = {
      ...selectFields,
      date_of_birth: true,
      nationality: true,
      sending_ccc_country: true,
      sending_ccc_origin: true,
      joined_fulltime_staff_date: true,
      japan_entry_date: true,
      separation_date: true,
      separation_reason: true,
    };
  }
  
  // Add L2 fields if authorized
  if (accessLevel >= 2) {
    selectFields = {
      ...selectFields,
      address_full: true,
      marital_status: true,
      children_count: true,
      emergency_contact_1_name: true,
      emergency_contact_1_relationship: true,
      emergency_contact_1_phone: true,
      emergency_contact_1_email: true,
      emergency_contact_2_name: true,
      emergency_contact_2_relationship: true,
      emergency_contact_2_phone: true,
      emergency_contact_2_email: true,
      remarks: true,
    };
  }
  
  // L1 fields (future implementation)
  
  return await db.employees.findUnique({
    where: { id: employeeId },
    select: selectFields,
  });
}

function getUserAccessLevel(role: UserRole): number {
  switch (role) {
    case 'general_staff': return 5;
    case 'team_leader': return 4;
    case 'hr_operations': return 2;
    case 'leadership': return 1;
    default: return 5;
  }
}
```

### Edit Permissions

```typescript
async function canEditEmployee(
  employeeId: string, 
  requestingUserId: string,
  fieldName: string
): Promise<boolean> {
  const requestingUser = await db.users.findUnique({ 
    where: { id: requestingUserId },
    include: { employee: true }
  });
  
  // HR/Operations and Leadership can edit anyone
  if (['hr_operations', 'leadership'].includes(requestingUser.role)) {
    return true;
  }
  
  // General staff and team leaders can only edit their own record
  const isOwnRecord = requestingUser.employee?.id === employeeId;
  if (!isOwnRecord) {
    return false;
  }
  
  // General staff can only edit limited L5 fields
  if (requestingUser.role === 'general_staff') {
    const editableFields = [
      'nickname',
      'residential_area',
      'email',
      'phone',
      'address_full'
    ];
    return editableFields.includes(fieldName);
  }
  
  // Team leaders can edit their own L5 + L4 fields
  if (requestingUser.role === 'team_leader') {
    const l1_l2_l3_fields = [
      'date_of_birth',
      'nationality',
      'sending_ccc_country',
      'sending_ccc_origin',
      'joined_fulltime_staff_date',
      'japan_entry_date',
      'marital_status',
      'children_count',
      'emergency_contact_1_name',
      'emergency_contact_1_relationship',
      'emergency_contact_1_phone',
      'emergency_contact_1_email',
      // etc - all L1-L3 fields
    ];
    return !l1_l2_l3_fields.includes(fieldName);
  }
  
  return false;
}
```

---

## TypeScript Type Definitions

**Generated from schema using Prisma or similar:**

```typescript
// Employee type with all access levels
export interface Employee {
  // System
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by_user_id: string;
  updated_by_user_id: string;
  
  // L5: Basic Profile
  photo_url?: string;
  name_passport_family: string;
  name_passport_middle?: string;
  name_passport_given: string;
  name_japanese_family?: string;
  name_japanese_given?: string;
  nickname?: string;
  gender: '男/M' | '女/F';
  status: string; // FK to ref_statuses
  current_mcc?: string; // FK to ref_mccs
  team_primary?: string; // FK to ref_teams
  team_secondary?: string; // FK to ref_teams
  residential_area?: string; // FK to ref_residential_areas
  email: string;
  phone: string;
  nst_gctc_completion_year?: number;
  
  // L3: Employment Records
  date_of_birth: Date;
  nationality: string;
  sending_ccc_country: string; // FK to ref_sending_ccc_countries
  sending_ccc_origin: string; // FK to ref_sending_ccc_origins
  joined_fulltime_staff_date: Date;
  japan_entry_date: Date;
  separation_date?: Date;
  separation_reason?: string;
  
  // L2: Personal Information
  address_full?: string;
  marital_status: string; // FK to ref_marital_statuses
  children_count: number;
  emergency_contact_1_name: string;
  emergency_contact_1_relationship: string;
  emergency_contact_1_phone: string;
  emergency_contact_1_email?: string;
  emergency_contact_2_name?: string;
  emergency_contact_2_relationship?: string;
  emergency_contact_2_phone?: string;
  emergency_contact_2_email?: string;
  remarks?: string;
  
  // L1: Salary & Compensation
  // (to be added)
  
  // Relations (populated when queried with includes)
  ministry_history?: MinistryHistory[];
  mission_trips?: MissionTrip[];
  ibs_courses?: IBSCourse[];
  seminary_education?: SeminaryEducation[];
}

export interface MinistryHistory {
  id: string;
  employee_id: string;
  start_year: number;
  start_month: number;
  start_day: number;
  end_year?: number;
  end_month?: number;
  end_day?: number;
  mcc: string; // FK to ref_mccs
  team: string; // FK to ref_teams
  position: string; // FK to ref_positions
  is_current: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MissionTrip {
  id: string;
  employee_id: string;
  start_year: number;
  start_month: number;
  start_day: number;
  end_year: number;
  end_month: number;
  end_day: number;
  location: string;
  position: string;
  created_at: Date;
  updated_at: Date;
}

export interface IBSCourse {
  id: string;
  employee_id: string;
  start_year: number;
  start_month: number;
  start_day: number;
  end_year: number;
  end_month: number;
  end_day: number;
  class_name: string; // FK to ref_ibs_courses
  credit_type: '単位取得' | '聴講';
  created_at: Date;
  updated_at: Date;
}

export interface SeminaryEducation {
  id: string;
  employee_id: string;
  start_year: number;
  start_month: number;
  start_day: number;
  end_year: number;
  end_month: number;
  end_day: number;
  seminary_name: string;
  degree: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  employee_id?: string;
  email: string;
  password_hash: string;
  role: 'general_staff' | 'team_leader' | 'hr_operations' | 'leadership';
  is_active: boolean;
  last_login_at?: Date;
  created_at: Date;
  updated_at: Date;
}

// Reference table types
export interface RefStatus {
  id: string;
  label_ja: string;
  label_en: string;
  sort_order: number;
  is_active: boolean;
}

export interface RefMCC {
  id: string;
  label_ja: string;
  label_en: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
}

export interface RefTeam {
  id: string;
  label_ja: string;
  label_en: string;
  mcc_id?: string;
  sort_order: number;
  is_active: boolean;
}

// ... other reference types follow same pattern
```

---

## Next Steps

### Immediate Actions (for Claude Code session)

1. **Validate this schema** with HR team (1 hour meeting)
   - Confirm access level boundaries
   - Verify all dropdown options are complete
   - Identify any missing fields

2. **Create migration files** (Sprint 0)
   - Write SQL migrations for all tables
   - Seed reference data
   - Test migrations up and down

3. **Set up type generation** (Sprint 0)
   - Configure Prisma or Kysely
   - Generate TypeScript types from schema
   - Validate type safety in sample queries

4. **Build seed data script** (Sprint 0)
   - Create 10-20 realistic employee records
   - Include various statuses, MCCs, teams
   - Generate related ministry history, mission trips, etc.

5. **Implement access control helpers** (Sprint 0)
   - Write query builder functions
   - Test access level filtering
   - Document usage patterns

### Future Considerations

**Performance:**

- Add composite indexes for common multi-field queries
- Consider partitioning if employee count grows beyond 10,000
- Implement database connection pooling
- Cache reference table data in application memory

**Audit Logging:**

- Track all changes to employee records
- Log who accessed what data when (especially L1/L2)
- Implement retention policy for audit logs

**Data Privacy:**

- GDPR considerations for international staff
- Right to be forgotten implementation
- Data export functionality
- Encryption at rest for sensitive fields

**Internationalization:**

- All reference tables have both Japanese and English labels
- UI can switch languages without database changes
- Consider adding more language columns if needed

---

## Appendix: Sample Queries

### Get all active employees with basic profile (L5)

```sql
SELECT 
  e.id,
  e.name_passport_given || ' ' || e.name_passport_family AS full_name,
  e.email,
  e.phone,
  s.label_en AS status,
  m.label_en AS current_mcc,
  t.label_en AS primary_team,
  ra.label_ja AS city
FROM employees e
JOIN ref_statuses s ON e.status = s.id
LEFT JOIN ref_mccs m ON e.current_mcc = m.id
LEFT JOIN ref_teams t ON e.team_primary = t.id
LEFT JOIN ref_residential_areas ra ON e.residential_area = ra.id
WHERE e.separation_date IS NULL
ORDER BY e.name_passport_family, e.name_passport_given;
```

### Get employee full profile with history (L4+)

```sql
SELECT 
  e.*,
  -- Current position from ministry history
  (SELECT mh.position 
   FROM ministry_history mh 
   WHERE mh.employee_id = e.id AND mh.is_current = true 
   LIMIT 1) AS current_position,
  -- Count of mission trips
  (SELECT COUNT(*) 
   FROM mission_trips mt 
   WHERE mt.employee_id = e.id) AS mission_trip_count,
  -- IBS completion status
  (SELECT COUNT(*) 
   FROM ibs_courses ibs 
   WHERE ibs.employee_id = e.id) AS ibs_courses_completed
FROM employees e
WHERE e.id = ?;
```

### Get team roster with access-appropriate fields

```sql
-- For Team Leaders viewing their team
SELECT 
  e.id,
  e.name_passport_given || ' ' || e.name_passport_family AS full_name,
  e.email,
  e.phone,
  s.label_en AS status,
  p.label_en AS position,
  e.nst_gctc_completion_year
FROM employees e
JOIN ref_statuses s ON e.status = s.id
LEFT JOIN ministry_history mh ON e.id = mh.employee_id AND mh.is_current = true
LEFT JOIN ref_positions p ON mh.position = p.id
WHERE e.team_primary = ? OR e.team_secondary = ?
ORDER BY p.sort_order, e.name_passport_family;
```

### Get ministry history timeline

```sql
SELECT 
  mh.start_year,
  mh.start_month,
  mh.end_year,
  mh.end_month,
  m.label_ja AS mcc,
  t.label_ja AS team,
  p.label_ja AS position
FROM ministry_history mh
JOIN ref_mccs m ON mh.mcc = m.id
JOIN ref_teams t ON mh.team = t.id
JOIN ref_positions p ON mh.position = p.id
WHERE mh.employee_id = ?
ORDER BY mh.start_year DESC, mh.start_month DESC;
```

### Search employees by name (fuzzy)

```sql
SELECT 
  e.id,
  e.name_passport_given || ' ' || e.name_passport_family AS full_name_en,
  COALESCE(e.name_japanese_family || ' ' || e.name_japanese_given, '') AS full_name_ja,
  e.nickname,
  e.email,
  t.label_en AS team
FROM employees e
LEFT JOIN ref_teams t ON e.team_primary = t.id
WHERE 
  e.name_passport_family LIKE ? OR
  e.name_passport_given LIKE ? OR
  e.name_japanese_family LIKE ? OR
  e.name_japanese_given LIKE ? OR
  e.nickname LIKE ? OR
  e.email LIKE ?
ORDER BY e.name_passport_family;
```

---

## End of Schema Design Document

This document should be treated as the authoritative reference for database design decisions. Update this document whenever schema changes are made, and version control all changes.
