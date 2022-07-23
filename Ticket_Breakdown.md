# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket #0001

#### Facilities will have the ability to assign agents custom IDs, in addition to internal agent ID

> #### Deadline: Within 14 days after assignment

This ticket tracks the below-listed sub tickets:

- [ ] #0002 Create database schema migration for custom agent ID per facility
- [ ] #0003 Implement API for custom agent ID per facility
- [ ] #0004 Implement UI for custom agent ID per facility
- [ ] #0005 Update `generateReport` function to include custom agent ID per facility

### Ticket #0002

#### Create database schema migration for custom agent ID per facility

> #### Deadline: Within 2 days after assignment

Facilities will have the ability to assign their own agents' IDs, in reference to #0001. Hence each agent can have `facility_agent_id` associated with every facility. To accomplish this we will create many-to-many relationship for `Facilities` and `Agents` tables, and store facilities' agent id in column `facility_agent_id` of table new table `agent_facility`. Following is the purposed new table for schema migration.

##### Proposed Schema Migration

Agent_Facility

| id | facility_id | agent_id | facility_agent_id |
|----|-------------|----------|-------------------|

- 2 column uniquekey on facility_id and agent_id
- `facility_id` column is forign key from `Facilites` table
- `agent_id` column is forign key from `Agent` table

### Ticket #0003

#### Implement API for custom agent ID per facility

> #### Deadline: Within 5 days after assignment

Facilities will have the ability to assign their own agents' IDs, in reference to #0001. Database migrations added with ticket #0002. Following are the update(s) required in backend service.

- Implement CRUD functionality for the Agent_Facility table with `getAgentIDByFacilityAndFacilityAgentID` and `getFacilityAgentIDByByFacilityAndAgentID` function to read internal Agent ID.
- Cache read functions using Redis cache as it will be called frequently. Make sure to reset cache key if `facility_agent_id` gets updated.
- Implement security controls for the Agent_Facility CRUD
and use Redis cache results
- Write test covering CRUD, security, and Redis cache

### Ticket #0004

#### Implement UI for custom agent ID per facility

> #### Deadline: Within 4 days after assignment

Facilities will have the ability to assign their own agents' IDs, in reference to #0001. API has been implemented with ticket #0003. Following are the update(s) required in frontend.

- Implement UI for API added in ticket #0003
- Implement E2E UI integration test in Cyprus

### Ticket #0005

#### Update `generateReport` function to include custom agent ID per facility

> #### Deadline: Within 3 days after assignment

Facilities will have the ability to assign their own agents' IDs, in reference to #0001. API and UI has been implemented with tickets #0003 & #0004.  Following are the update(s) required in the backend function `generateReport``.

- Update `generateReport` function to include `facility_agent_id` by running function `getFacilityAgentIDByByFacilityAndAgentID`.
- Update tests for new pdf which include custom agent ID
