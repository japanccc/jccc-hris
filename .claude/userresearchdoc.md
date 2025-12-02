# JCCC HRIS User Research Document

**Version:** 1.0  
**Date:** 2025-12-02  
**Status:** Initial Findings - In Progress

---

## Table of Contents

1. [Research Overview](#research-overview)
2. [User Personas](#user-personas)
3. [Research Findings](#research-findings)
4. [Feature Implications](#feature-implications)
5. [Priority Matrix](#priority-matrix)
6. [Next Research Steps](#next-research-steps)

---

## Research Overview

### Research Goals

This research aims to understand how different roles within JCCC interact with employee information and what pain points exist in current workflows. The findings will inform the design and prioritization of features in the JCCC HRIS system.

### Methodology

- **Initial Stakeholder Interviews**: Conducted informal conversations with key stakeholders
- **User Story Collection**: Gathered concrete needs from different organizational roles
- **Workflow Observation**: (Planned) Shadow users performing common tasks
- **Pain Point Mapping**: (Planned) Document current system frustrations

---

### Research Timeline

- **Phase 1 (Current)**: Initial stakeholder interviews and user story collection
- **Phase 2 (Planned)**: Detailed workflow observation and pain point analysis
- **Phase 3 (Planned)**: Prototype testing and feedback gathering
- **Phase 4 (Planned)**: Post-launch usage analysis and iteration

---

## User Personas

### Persona 1: New Staff/Stinter (新スタッフ/スティンター)

**Profile:**

- Recently joined JCCC or arriving in Japan
- Age: 20-35
- Technical proficiency: Varies widely
- Primary language: May be English, Japanese, or other
- Time in organization: 0-6 months

**Key Characteristics:**

- Overwhelmed with onboarding tasks
- Needs clear guidance on administrative requirements
- Multiple people helping them with different aspects
- Uncertain about who to ask for what information

**Current Pain Points:**

- Information scattered across emails, spreadsheets, and verbal instructions
- Unclear about what administrative tasks are needed
- Don't know who is responsible for helping with specific issues
- Difficulty finding contact information for colleagues

**Technology Comfort:**

- Comfortable with consumer apps (social media, messaging)
- May struggle with complex enterprise systems
- Expects mobile-friendly interfaces

---

### Persona 2: Team Admin Point Person (チーム管理担当者)

**Profile:**

- Handles administrative tasks for SLM city teams
- Age: 25-45
- Technical proficiency: Moderate to high
- Role: Often a senior team member with additional admin responsibilities
- Workload: Balances ministry work with administrative tasks

**Key Characteristics:**

- Detail-oriented and organized
- Works with Japanese government offices and utility companies
- Needs accurate, official information quickly
- Manages multiple team members' administrative needs

**Current Pain Points:**

- Looking up official names, dates, passport numbers in multiple places
- Uncertainty about whether information is current
- Time wasted searching for documents
- Risk of errors when transcribing information

**Technology Comfort:**

- Proficient with spreadsheets and forms
- Appreciates keyboard shortcuts and efficiency features
- Needs reliable, searchable database

---

### Persona 3: LDHR Visa Coordinator (LDHR ビザ担当者)

**Profile:**

- Specialized role managing visa and immigration matters
- Age: 30-50
- Technical proficiency: High
- Expertise: Deep knowledge of Japanese immigration law
- Responsibility: Ensuring all international staff maintain legal status

**Key Characteristics:**

- Tracks deadlines and renewal dates
- Manages complex, multi-step visa processes
- Coordinates with multiple parties (staff, immigration lawyers, government)
- High stakes - visa errors can result in deportation

**Current Pain Points:**

- Difficult to see visa status at a glance
- Manual tracking of renewal timelines
- No central place for visa-related documents
- Hard to prioritize who needs attention soon

**Technology Comfort:**

- Very comfortable with databases and tracking systems
- Values data visualization (timelines, status indicators)
- Needs email/alert functionality for upcoming deadlines

---

### Persona 4: Conference Administrator (会議管理者)

**Profile:**

- Plans and executes organizational conferences 2-4 times per year
- Age: 30-50
- Technical proficiency: Moderate to high
- Timeline: Intense work periods leading up to conferences
- Scale: Managing 50-200+ participants per event

**Key Characteristics:**

- Works with tight deadlines
- Needs to merge data from multiple sources
- Creates various documents (rosters, insurance forms, room assignments)
- Manages conference-specific information (attendance, special requests)

**Current Pain Points:**

- Manual data entry from HRIS to conference registration
- Creating participant lists requires extensive copy/paste
- Insurance company forms need specific format
- Updating mailing lists is time-consuming
- Dietary restrictions and allergies scattered across systems

**Technology Comfort:**

- Proficient with spreadsheets and mail merge
- Appreciates export/import functionality
- Values templates and bulk operations

---

### Persona 5: LDHR Team Leader (LDHR チームリーダー)

**Profile:**

- Oversees HR operations and strategic planning
- Age: 35-55
- Technical proficiency: Moderate
- Responsibility: Resource allocation, team composition, reporting to leadership
- Focus: Big picture trends and patterns

**Key Characteristics:**

- Needs aggregate data and statistics
- Makes strategic decisions about team composition
- Reports to leadership on organizational health
- Plans recruitment and training initiatives

**Current Pain Points:**

- Creating reports requires manual counting and aggregation
- Difficult to see team composition at a glance
- Can't easily track trends over time
- Preparing reports for leadership meetings is time-intensive

**Technology Comfort:**

- Comfortable with dashboards and visualizations
- May delegate technical implementation
- Values printable reports for meetings

---

### Persona 6: LDHR Executive (LDHR 幹部)

**Profile:**

- Senior HR leadership role
- Age: 40-60
- Technical proficiency: Low to moderate
- Responsibility: Staff care, recognition programs, long-term planning
- Focus: Individual care and organizational culture

**Key Characteristics:**

- Deeply values personal connection with staff
- Oversees staff recognition and appreciation
- Plans milestone celebrations (5 years, 10 years, etc.)
- Thinks in terms of staff development and career progression

**Current Pain Points:**

- Hard to identify who has milestone anniversaries coming up
- Manual calculation of years of service
- Missing opportunities to recognize staff achievements
- Planning appreciation events requires extensive data gathering

**Technology Comfort:**

- May need assistance with complex queries
- Appreciates simple, clear reports
- Values having assistant who can pull data

---

### Persona 7: Senior Leadership (幹部リーダー)

**Profile:**

- Executive leadership (国際局長, etc.)
- Age: 45-65
- Technical proficiency: Low to moderate
- Responsibility: Strategic planning, ministry development, succession planning
- Focus: Long-term organizational health and effectiveness

**Key Characteristics:**

- Makes decisions about staff assignments and development
- Plans training initiatives and leadership development
- Considers organizational structure and team effectiveness
- Needs historical context for decision-making

**Current Pain Points:**

- Incomplete picture of staff experience and training
- Difficult to identify candidates for leadership roles
- Can't easily see who has specific expertise or background
- Planning training programs without clear view of gaps

**Technology Comfort:**

- Delegates most technical work
- Appreciates executive summaries and visualizations
- Needs information presented in meetings/reports

---

## Research Findings

### Finding 1: New Staff/Stinter Onboarding Experience

**User Story:**
> "As a new staff or stinter, I want to be able to arrive in Japan with all of my administrative needs properly managed and taken care of in a centralized platform that I and other staff managing and/or helping me can reference relevant information and action steps in a streamlined way at any time."

**Analysis:**

**Pain Point:** Current onboarding is fragmented across multiple systems, people, and documents. New staff report feeling overwhelmed and uncertain about what they need to do.

**User Need:**

- Single source of truth for onboarding tasks
- Visibility into who is helping with what
- Clear action steps and checklists
- 24/7 access to reference information

---

**Context:**

- Onboarding involves multiple departments: HR, finance, team leaders, admin support
- Tasks include: visa application, housing setup, utilities, bank account, insurance, etc.
- Timeline spans weeks to months
- New staff may not yet speak Japanese fluently

---

**Implications for System Design:**

- Need an onboarding dashboard or portal
- Task management with assignments (who is responsible)
- Status tracking (pending, in progress, complete)
- Document repository for required forms
- Multi-user access so helpers can update progress

---

**Access Level Consideration:**

- New staff should see their own onboarding status (L5)
- HR/Operations need to manage all onboarding tasks (L2/L3)
- May need special "onboarding" view that's temporary

**Priority:** HIGH - Directly impacts new staff experience and retention

---

### Finding 2: Staff Directory for Connection

**User Story:**
> "As a new staff or stinter, I want to have a digital directory in order to see a comprehensive list of who is in which city and which team they are on etc…"

**Analysis:**

**Pain Point:** New staff struggle to understand organizational structure and connect with colleagues. Current contact lists are outdated or incomplete.

**User Need:**

- Searchable, visual directory
- Filter by city, team, role
- Contact information (email, phone)
- Photos to match names with faces
- See team structure (who leads what)

---

**Context:**

- JCCC has ~50-100+ staff across multiple cities
- Teams have different focuses (SLM, DS, Operations, etc.)
- New staff need to know who to contact for different issues
- Building relationships is key to ministry effectiveness

---

**Implications for System Design:**

- L5 profile data should be visible to all staff
- Need robust search and filter functionality
- Grid or card view with photos
- Team hierarchy visualization
- Mobile-friendly for looking up while traveling

---

**Related to Schema:**

- This validates the L5 access level design
- `residential_area`, `team_primary`, `team_secondary` fields are essential
- May need to add `position` to L5 if not already there
- Photos are important - validate `photo_url` field

**Priority:** HIGH - Fundamental to system value proposition

---

### Finding 3: Quick Access to Official Information

**User Story:**
> "As an SLM team's admin point person (who does all the city office and utilities stuff), I need a quick way to pull up all of a given person(s) official information when working with registration, contracts, etc…"

**Analysis:**

**Pain Point:** Admin tasks often happen on short notice. Current system requires searching through emails, spreadsheets, or contacting multiple people to gather required information.

**User Need:**

- One-click access to official information
- Copy/paste friendly formatting
- See: full legal name, passport name, date of birth, nationality, address, phone
- Ability to print or export specific records
- Confidence that information is current

---

**Context:**

- Japanese bureaucracy requires exact information (name spelling, etc.)
- Tasks include: registering with city office (住民登録), setting up utilities, signing apartment leases
- Errors cause delays and require re-submission
- Often working under time pressure (moving in this week, etc.)

---

**Implications for System Design:**

- Need single-page "Official Information" view
- L3 access required (includes full name, DOB, address)
- Print-friendly formatting
- Copy buttons for each field
- Consider adding "last verified" date for data quality

---

**Related to Schema:**

- This is core L3 functionality
- Validates need for: `name_passport_*`, `name_japanese_*`, `date_of_birth`, `address_full`, `nationality`
- May need to add passport number field (currently not in schema)
- Consider adding "Legal Documents" section in future

**Priority:** HIGH - Frequent use case, high pain point

---

### Finding 4: Visa Management and Timeline Tracking

**User Story:**
> "As LDHR Visa 担当者 I need an easily readable view of all of a given person(s) visa info with the ability to list out relevant steps and their current progress in timeline format."

**Analysis:**

**Pain Point:** Visa processes are complex, multi-step, and time-sensitive. Missing deadlines can result in staff having to leave Japan. Current tracking is manual and error-prone.

**User Need:**

- Dashboard showing all staff visa status
- Visual timeline for each person's visa process
- Alert system for upcoming deadlines (90 days, 60 days, 30 days, 1 week)
- Checklist of required steps
- Document upload and tracking
- Historical record of past visa renewals

---

**Context:**

- Different visa types have different rules (religious, work, dependent, etc.)
- Renewal process can take 2-3 months
- Requires coordination with immigration lawyers
- Some steps depend on staff (provide documents) vs. LDHR (submit application)
- High anxiety for international staff about visa status

---

**Implications for System Design:**

- This requires NEW functionality beyond current schema
- Need to add visa-specific tables and fields
- Consider workflow/checklist management
- Email notification system
- Document management integration
- Timeline visualization component

---

**Related to Schema:**

- Current schema has basic visa fields in L3: `visa_expiry_date`, `passport_number`, `residence_card_number`
- NEED TO EXPAND: Add visa type, application date, status, renewal history
- Consider separate `visa_renewals` table similar to `ministry_history`
- Add `visa_documents` table for document tracking

**Priority:** CRITICAL - Legal compliance issue, affects staff wellbeing

**Recommended Expansion:**

```sql
CREATE TABLE visa_records (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  visa_type TEXT NOT NULL,  -- Religious, Work, Dependent, etc.
  visa_number TEXT,
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  status TEXT NOT NULL,  -- Current, Expired, Renewal In Progress
  application_date DATE,
  approval_date DATE,
  notes TEXT,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE visa_renewal_steps (
  id TEXT PRIMARY KEY,
  visa_record_id TEXT NOT NULL,
  step_name TEXT NOT NULL,
  due_date DATE,
  completion_date DATE,
  status TEXT NOT NULL,  -- Pending, In Progress, Complete, Blocked
  assigned_to TEXT,  -- Staff member or LDHR
  notes TEXT,
  FOREIGN KEY (visa_record_id) REFERENCES visa_records(id)
);
```

---

### Finding 5: Conference Data Integration

**User Story:**
> "As a conference administrator, I need to be able to pull in all staff/stinter information from an existing database and sync it up with the registration form where they fill out this conference-specific information: 参加の有無・参加形態・その他の要望 so that I can accurately figure out 部屋割、参加費、and create the proper mailing lists for conference communication."

**Analysis:**

**Pain Point:** Conference planning requires merging HRIS data with conference-specific registration data. Currently done manually with high error rate. Room assignments and cost calculations are tedious.

**User Need:**

- Export HRIS data in format compatible with conference system
- Import conference registration responses back into HRIS
- Automated matching of records
- Generate mailing lists filtered by registration status
- Calculate costs based on attendance type
- Assign rooms considering preferences and constraints

---

**Context:**

- JCCC holds 2-4 major conferences per year
- Conferences have 50-200+ participants
- Conference registration asks: attendance (yes/no), format (in-person/online), special requests
- Room assignments consider: gender, family units, preferences, accessibility
- Cost varies by: attendance format, length of stay, meal plan

---

**Implications for System Design:**

- Need API or export functionality
- Consider building conference module within HRIS
- Data sync and import/export workflows
- Bulk operations for mailing list generation
- May need separate `conferences` and `conference_registrations` tables

---

**Related to Schema:**

- Uses L5 data: name, email, phone, team
- Uses L2 data: dietary restrictions (allergies), family composition
- May need to add conference-specific fields as optional module

**Priority:** MEDIUM-HIGH - Important recurring use case, but can be phased

**Recommended Future Addition:**

```sql
CREATE TABLE conferences (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  venue TEXT,
  registration_deadline DATE,
  status TEXT  -- Planning, Open for Registration, Closed, Complete
);

CREATE TABLE conference_registrations (
  id TEXT PRIMARY KEY,
  conference_id TEXT NOT NULL,
  employee_id TEXT NOT NULL,
  attendance_status TEXT,  -- Attending, Not Attending, Tentative
  attendance_format TEXT,  -- In Person, Online, Hybrid
  special_requests TEXT,
  dietary_restrictions TEXT,
  room_assignment TEXT,
  cost_category TEXT,
  payment_status TEXT,
  registered_at TIMESTAMP,
  FOREIGN KEY (conference_id) REFERENCES conferences(id),
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

---

### Finding 6: Insurance Documentation

**User Story:**
> "As a conference administrator, I need to be able to quickly create a 参加者名簿 (participant roster) with birthday/age for submitting to キャンプ保険会社 (camp insurance company)"

**Analysis:**

**Pain Point:** Insurance companies require participant rosters in specific format. Currently created manually from spreadsheet. Time-consuming and error-prone, especially under deadline pressure.

**User Need:**

- One-click export to insurance company format
- Include: name, date of birth, age, gender
- Formatted exactly as required by insurance forms
- Ability to generate for subset of staff (conference attendees only)
- Save as PDF or Excel for submission

---

**Context:**

- Required for every conference
- Insurance companies are strict about format
- Age calculated as of conference date (not current age)
- Errors can delay insurance approval
- Usually due 1-2 weeks before event

---

**Implications for System Design:**

- Report generation functionality
- Template system for different insurance companies
- Age calculation as of specific date
- Export to PDF and Excel
- Preview before exporting

---

**Related to Schema:**

- Uses L3 data: `date_of_birth` (restricted access)
- Uses L5 data: `name_passport_*`, `gender`
- Validates need for accurate DOB in system
- Report generation tied to conference registration data

**Priority:** MEDIUM - Important but infrequent (2-4 times per year)

**Technical Note:**

- Age calculation needs to be flexible (as of event date, not today)
- Consider Japanese age calculation rules (sometimes different from Western)

---

### Finding 7: Team Composition Analytics

**User Story:**
> "As an LDHR team leader, I need to know the overall staff and stint numbers in each team and what countries they are from"

**Analysis:**

**Pain Point:** Strategic planning and resource allocation requires understanding team composition. Currently done by manually counting rows in spreadsheet. Can't easily track changes over time.

**User Need:**

- Dashboard showing staff count by team
- Breakdown by status (full-time, stinter, etc.)
- Nationality distribution
- Historical trends (how has this changed over time?)
- Export data for reports and presentations

---

**Context:**

- Used for leadership meetings and strategic planning
- Helps identify teams that are understaffed or growing rapidly
- Tracks internationalization of organization
- Informs recruitment priorities
- Shared with sending CCCs for partnership discussions

---

**Implications for System Design:**

- Analytics/reporting module
- Data aggregation queries
- Visualization (charts, graphs)
- Date range filtering for historical analysis
- Export to presentation format

---

**Related to Schema:**

- Uses L5 data: `status`, `team_primary`, `team_secondary`
- Uses L3 data: `nationality`, `sending_ccc_origin`
- Validates design decision to have both primary and secondary teams
- May want to track team changes over time via `ministry_history`

**Priority:** MEDIUM - Strategic value but not daily use

**Technical Considerations:**

- Aggregation queries can be expensive - consider caching
- Charts should be dynamic and filterable
- Consider scheduled reports (monthly team composition email)

---

### Finding 8: Tenure Tracking for Recognition

**User Story:**
> "As an LDHR executive, I need to know for each member of JCCC, the Number of years on staff (IR included) for long service appreciation award/acknowledgment planning"

**Analysis:**

**Pain Point:** Staff appreciation is core value but milestone anniversaries are often missed. Calculating tenure manually from various start dates is error-prone.

**User Need:**

- Automatic calculation of years of service
- Alert system for upcoming milestones (5 years, 10 years, etc.)
- List of who has anniversary in next 90 days
- Include time as IR in total tenure calculation
- Historical record of past recognitions given

---

**Context:**

- JCCC values long-term commitment
- Standard milestones: 5 years, 10 years, 15 years, 20+ years
- Recognition includes: certificates, gifts, public acknowledgment at conferences
- Missing someone's milestone damages morale
- Planning requires 2-3 months lead time for ordering items

---

**Implications for System Design:**

- Computed field for tenure (years of service)
- Notification/alert system
- Filter for "anniversaries in next 90 days"
- May need to track recognition history
- Consider "IR start date" vs "full-time start date"

---

**Related to Schema:**

- Uses L3 data: `joined_fulltime_staff_date`
- Current schema has this field - validates design
- May need to add `ir_start_date` if IR tenure counted separately
- Consider adding `recognitions` table for tracking awards given

**Priority:** MEDIUM - Important for culture but infrequent

**Technical Note:**

```sql
-- Query for upcoming anniversaries
SELECT 
  id,
  name_passport_given || ' ' || name_passport_family AS name,
  joined_fulltime_staff_date,
  CAST((julianday('now') - julianday(joined_fulltime_staff_date)) / 365.25 AS INTEGER) AS years_of_service,
  date(joined_fulltime_staff_date, '+' || 
    (CAST((julianday('now') - julianday(joined_fulltime_staff_date)) / 365.25 AS INTEGER) + 1) || ' years') 
    AS next_anniversary_date
FROM employees
WHERE separation_date IS NULL
  AND (years_of_service + 1) % 5 = 0  -- Next anniversary is a milestone
  AND julianday(next_anniversary_date) - julianday('now') <= 90  -- Within 90 days
ORDER BY next_anniversary_date;
```

---

### Finding 9: Development Planning and Training Gaps

**User Story:**
> "As a senior leader, I need to be able to see each member's 'Past ministry experiences and training received' for planning future development, trainings"

**Analysis:**

**Pain Point:** Leadership struggles to make informed decisions about staff development and assignment because they lack complete picture of experience and training. Talented staff may be overlooked for opportunities.

**User Need:**

- Comprehensive view of each person's background
- Filter/search by specific training or experience
- Identify training gaps across organization
- Find people with specific expertise for special projects
- Plan training programs based on organizational needs

---

**Context:**

- Leadership is planning next generation of leaders
- Want to ensure all staff receive appropriate training
- Sometimes need to quickly find someone with specific background
- Training budget decisions require understanding of gaps
- Succession planning requires knowing who has relevant experience

---

**Implications for System Design:**

- This is L4 data (Ministry History)
- Need robust search across ministry_history, ibs_courses, seminary_education
- Skills/expertise tagging system
- Training gap analysis reporting
- Leadership dashboard with development recommendations

---

**Related to Schema:**

- Uses L4 data: `ministry_history`, `ibs_courses`, `seminary_education`
- Current schema supports this well
- May want to add `skills` or `expertise` tags to employees table
- Consider adding `training_needs` or `development_goals` field

**Priority:** MEDIUM - Strategic importance but not urgent

**Advanced Features to Consider:**

- Skills inventory/tagging system
- Training recommendation engine
- Succession planning module
- Development pathway visualization

---

## Feature Implications

Based on the research findings, here are the key feature requirements:

### Must-Have Features (MVP)

1. **Employee Directory** (Finding 2)
   - Search and filter by name, team, city
   - Card/grid view with photos
   - Contact information (email, phone)
   - Access Level: L5

2. **Profile Management** (Finding 3)
   - View complete employee profile
   - Edit profile based on role permissions
   - "Official Information" view for admin tasks
   - Access Level: L5 (basic), L3 (official info)

3. **Basic Reporting** (Finding 7)
   - Team composition statistics
   - Staff count by status and team
   - Nationality breakdown
   - Access Level: L4+

---

### High Priority Features (Phase 2)

4. **Onboarding Dashboard** (Finding 1)
   - Task checklist for new staff
   - Multi-user task assignment
   - Status tracking
   - Document repository
   - Access Level: L5 (own), L2 (all staff)

5. **Visa Management** (Finding 4) - CRITICAL
   - Visa renewal tracking and timeline
   - Alert system for expiring visas
   - Document upload
   - Renewal history
   - Access Level: L3

6. **Ministry History Tracking** (Finding 9)
   - Complete training and experience records
   - Search by expertise/background
   - Training gap analysis
   - Access Level: L4

---

### Medium Priority Features (Phase 3)

7. **Conference Integration** (Finding 5, 6)
   - Conference registration module
   - Participant roster generation
   - Insurance form export
   - Mailing list creation
   - Access Level: L2 (for personal info), L5 (for basic roster)

8. **Recognition and Milestones** (Finding 8)
   - Tenure calculation
   - Upcoming anniversary alerts
   - Recognition history
   - Access Level: L3

---

### Future Enhancements

9. **Analytics Dashboard**
   - Historical trends
   - Predictive analytics
   - Custom reports
   - Data visualization

10. **Mobile App**
    - Quick directory lookup
    - Basic profile editing
    - Notifications

11. **API for Integrations**
    - Connect with other systems
    - Data export/import
    - Webhook notifications

---

## Priority Matrix

### Impact vs. Effort

```text
High Impact, Low Effort (DO FIRST):
├─ Employee Directory (Finding 2)
├─ Profile Management (Finding 3)
└─ Team Composition Reports (Finding 7)

High Impact, High Effort (SCHEDULE):
├─ Visa Management System (Finding 4) - CRITICAL
├─ Onboarding Dashboard (Finding 1)
└─ Conference Integration (Finding 5, 6)

Low Impact, Low Effort (QUICK WINS):
├─ Tenure Tracking (Finding 8)
└─ Basic Export Functions

Low Impact, High Effort (DEPRIORITIZE):
├─ Advanced Analytics
└─ Full API Development
```

### By User Role Priority

**Most Critical Roles (Address First):**

1. New Staff/Stinters - Onboarding experience
2. LDHR Visa Coordinator - Legal compliance
3. Team Admin - Daily operations

**Important Roles (Phase 2):**

1. Conference Administrators - Event management
2. LDHR Team Leaders - Strategic planning

**Strategic Roles (Phase 3):**

1. LDHR Executives - Recognition and culture
2. Senior Leadership - Development planning

---

## Next Research Steps

1. **Validate Findings with HR Leadership** (1 hour meeting)
   - Review all user stories
   - Confirm priority assessment
   - Identify any missed use cases

2. **Shadow Key Users** (2-3 hours per role)
   - Team Admin: Watch them complete a city registration
   - Visa Coordinator: Observe renewal tracking process
   - Conference Admin: See conference roster creation

3. **Document Current Workflows** (1 week)
   - Map out current processes step-by-step
   - Identify all systems/tools currently used
   - Note pain points and workarounds
   - Collect examples of current documents/outputs

4. **Feature-Specific Research** (30-60 min per feature)
   - Detailed workflow analysis
   - Mockup review with users
   - Identify edge cases
   - Confirm acceptance criteria

5. **Usability Testing** (Ongoing)
   - Watch real users complete tasks
   - Measure time to complete common actions
   - Collect feedback on confusing elements
   - Track error rates and support requests

6. **Usage Analytics** (Monthly)
   - Which features are most used?
   - Where do users get stuck?
   - What workflows take longest?
   - Who isn't using the system and why?

7. **Regular Check-ins** (Quarterly)
   - Survey all users on satisfaction
   - Collect new feature requests
   - Review priority of backlog items
   - Celebrate wins and improvements

---

## Research Questions to Answer

### Unanswered Questions from Initial Findings

1. **Onboarding (Finding 1):**
   - What are ALL the tasks in onboarding process?
   - Who is responsible for each task currently?
   - What is the typical timeline?
   - What documents are required?
   - What are the biggest bottlenecks?

2. **Visa Management (Finding 4):**
   - What are the different visa types used?
   - What is the exact renewal process for each type?
   - How far in advance should renewal start?
   - Who are the immigration lawyers/contacts?
   - What documents are required for renewal?
   - What is current system for tracking?

3. **Conference Integration (Finding 5):**
   - What conference systems are currently used?
   - What is the exact data flow?
   - What format does insurance company require?
   - How are room assignments currently calculated?
   - What are the cost calculation rules?

4. **Access Control Validation:**
   - Should Team Leaders see L4 data for their team only or all staff?
   - Should new staff see their own L2/L3 data during onboarding?
   - Are there any fields that need custom access rules?

5. **International Considerations:**
   - Do non-Japanese speaking staff need UI in their language?
   - Are there cultural considerations for certain features?
   - Do different sending CCCs have different requirements?

---

## Appendix: Raw User Stories

### Complete User Story Collection

All collected user stories are listed here for reference:

1. "As a new staff or stinter, I want to be able to arrive in Japan with all of my administrative needs properly managed and taken care of in a centralized platform that I and other staff managing and/or helping me can reference relevant information and action steps in a streamlined way at any time."

2. "As a new staff or stinter, I want to have a digital directory in order to see a comprehensive list of who is in which city and which team they are on etc…"

3. "As an SLM team's admin point person (who does all the city office and utilities stuff), I need a quick way to pull up all of a given person(s) official information when working with registration, contracts, etc…"

4. "As LDHR Visa 担当者 I need an easily readable view of all of a given person(s) visa info with the ability to list out relevant steps and their current progress in timeline format."

5. "As a conference administrator, I need to be able to pull in all staff/stinter information from an existing database and sync it up with the registration form where they fill out this conference-specific information: 参加の有無・参加形態・その他の要望 so that I can accurately figure out 部屋割、参加費、and create the proper mailing lists for conference communication."

6. "As a conference administrator, I need to be able to quickly create a 参加者名簿 with birthday/age for submitting to キャンプ保険会社"

7. "As an LDHR team leader, I need to know the overall staff and stint numbers in each team and what countries they are from"

8. "As an LDHR executive, I need to know for each member of JCCC, the Number of years on staff (IR included) for long service appreciation award/acknowledgment planning"

9. "As a senior leader, I need to be able to see each member's 'Past ministry experiences and training received' for planning future development, trainings"

---

### Future User Story Gathering

**Planned Interviews:**

- [ ] General Staff (non-leadership) - Get perspective of typical system users
- [ ] Team Leaders - Understand team management needs
- [ ] Finance Team - Payment and reimbursement workflows
- [ ] IT/Operations - Technical integration requirements
- [ ] Sending CCC Partners - What data do they need to receive?

---

## Document History

**Version 1.0** (2025-12-02)

- Initial user research findings documented
- 9 user stories collected and analyzed
- 7 personas developed
- Feature implications mapped
- Priority matrix created

**Next Update:** After stakeholder validation meeting

---

## End of User Research Document

This document should be considered a living document and updated regularly as new research is conducted and insights are gathered.
