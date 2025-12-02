# JCCC HRIS Project Instructions for Future Claude Sessions

**Date Created:** 2025-12-02  

**Project:** Internal HR Information Storage and Retrieval System for Japan Campus Crusade for Christ (日本キャンパスクルセードフォークライスト)

## Project Overview

Building an internal HR system for JCCC, a missions organization with international staff working in Japan.

The system features a tiered hierarchical access control model that restricts information depth rather than scope - meaning all users can see basic profile information for all colleagues, but access to sensitive details is limited by role.

Still when it comes to a logged-in user's own information - a lot of the fields in L4~L1 should be editable by them and not just the administrator or direct superior, so self-maintenance of data accuracy is enabled, except for things like training, work experience and mission trips details. These should be entered by administrators but users can see the information and notify the admins if they spot inaccuracies.

## Technology Stack

### Core Framework

- SvelteKit

### Component Libraries

#### Use both Skeleton.dev + shadcn-svelte

- **Skeleton.dev** for:
  - Layout (AppShell, AppBar, Drawer)
  - Theming system and theme switching
  - Navigation components
  - Modals and Toast notifications
  
- **shadcn-svelte** for:
  - Data tables (more powerful for employee lists)
  - Complex forms with validation
  - Advanced selects and combobox components
  - Dialogs for CRUD operations

### Database

- **SQLite** for POC (designed to be portable to PostgreSQL)
- Consider **Turso** for hosted SQLite option

### Styling

- **Tailwind CSS** (required for both component libraries)
- Map shadcn CSS variables to Skeleton theme tokens for consistency

## Detailed Schema Design

The database schema design is available at `./claude/schemadesign.md`

## User Research Documentation

The living documentation of the existing user needs is available at `./claude/userresearchdoc.md`

## Agents and MCP Servers

Agent-specific instructions for working with MCP servers and specialized AI workflows in this project at `./claude/AGENTS.md`

### Reference Tables Needed for L5

All dropdowns should pull from reference tables with both Japanese and English labels:

1. **ref_statuses** - ステータス options
   - Examples: Full-time, Stinter, Staff Stinter, Part-time, IR, ICS, Associate

2. **ref_mccs** - Mission Critical Components (部門)
   - Examples: NLT, Prayer, Operations, SLM, DS, LDHR, Training/MPD

3. **ref_teams** - チーム options
   - Examples: Prayer, Operations Office, SLM National, SI Tokyo, SI Osaka, etc.
   - Note: Some teams belong to MCCs, some don't (nullable mcc_id)

4. **ref_positions** - ポジション options
   - Examples: リーダー/leader, 副リーダー/deputy, メンバー/member, スティンター/Stinter, None

5. **ref_residential_areas** - 居住地域 (city-level)
   - Examples: 札幌, 東京, 横浜, 名古屋, 大阪, 京都, 神戸, 福岡

### Required vs Optional Fields

**Required (cannot be NULL):**

- name_passport_family, name_passport_given
- gender
- status
- email, phone

**Optional (allow NULL for incomplete data during onboarding):**

- photo_url
- name_japanese_* (for non-Japanese staff)
- nickname
- current_mcc (may be unassigned initially)
- team_primary, team_secondary
- residential_area
- nst_completion_year

---

## Component Requirements for Interface

### View Mode (Employee List/Card)

- **Table** - Main employee list with sorting, filtering, pagination
- **Avatar** - Photo display
- **Badge** - Status, role indicators (color-coded)
- **Card** - Alternative grid view option

### Edit Mode (Create/Update)

- **Form** - Structure with validation
- **Input** - Name fields, contact info
- **Select** - Gender, status, role, country dropdowns
- **Combobox** - Searchable: MCC, teams, team leader (employee search)
- **Tags/Multi-select** - Skills (if applicable)
- **Dialog** - Create/edit modals
- **Button** - Save, cancel, delete actions

### Navigation & Layout

- **AppShell** (Skeleton) - Main layout structure
- **AppBar** (Skeleton) - Top navigation with theme switcher
- **Drawer** (Skeleton) - Sidebar navigation
- **Tabs** - Switch between L5, L4, L3, L2, L1 views
- **Sheet** - Slide-out panel for quick details
- **Separator** - Visual section breaks

---

## Development Phases

### Phase 0: Foundation (Sprint 0)

1. Create SvelteKit project structure
2. Set up both Skeleton + shadcn-svelte
3. Configure Tailwind with both plugins
4. Map CSS variables for theme consistency
5. Create SQLite database schema for L5 + reference tables
6. Set up TypeScript types generation
7. Seed reference data (statuses, MCCs, teams, etc.)

### Phase 1: L5 Core Features (Sprint 1-2)

1. Employee list view (table with filtering/sorting)
2. Employee profile view (read-only card)
3. Create employee form
4. Edit employee form
5. Basic access control (all staff can view, limited edit)
6. Japanese text handling validation

### Phase 2: L4 Ministry History (Sprint 3-4)

1. Ministry history table (positions over time)
2. Mission trips tracking
3. IBS courses tracking
4. Seminary education tracking
5. Team leader access level implementation

### Phase 3: L3 Employment Records (Sprint 5-6)

1. Add L3 fields to employee profile
2. Visa tracking
3. Employment dates and tenure calculations
4. HR/Operations access level implementation

### Phase 4: L2 Personal Information (Sprint 7-8)

1. Add L2 fields (address, family, emergency contacts)
2. Additional privacy controls
3. Audit logging for L2 access
