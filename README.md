<img src="https://i.imgur.com/L5nX9pT.png" width="100%" />

# ElectroCRUD 2 ![GitHub Release Date](https://img.shields.io/github/release-date/garrylachman/ElectroCRUD.svg?style=for-the-badge) [![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/electrocrud.svg?style=for-the-badge)](https://opencollective.com/electrocrud)
### ElectroCRUD?
ElectroCRUD is Open Source Database CRUD (Create, Read, Update, Delete) Software. No Code Needed — Just in a few clicks, you can create a Database Admin/Dashboard/Whatever. Its Open Source — It's Free.

### Why?
After a failed search for a basic admin panel that does not involve writing code or installs web-based solutions, I came up with ElectroCRUD idea.

### ElectroCRUD v1
The ElectroCRUD v1 was born in 2016. An Electron application that made it possible to create a friendly dashboard with data tables, search, widgets, filter & relations with few clicks without any experience in programming.

### ElectroCRUD v2
After a few years of the project being inactive, I decided to bring it to life again. The codebase was built from scratch using Electron+Angular8. The new version contains most of the features of the first version, and new features are added on a weekly basis.

From version 2.7.0 SQLite has been added, currently its very limited support but we working on full support for next version.

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) 

![ElectroCRUD](https://github.com/garrylachman/ElectroCRUD/raw/gh-pages/electrocrud-dec-2020.gif)

### Functionality
- [x] MySQL Support
- [x] PostgreSQL Support
- [x] SQLite Support (limited support, work in progress)
- [x] SSH Tunnels (Keys & Password)
- [x] Accounts (represent a database)
  - [x] Add / Edit
  - [x] Test connection (ssh, db)
  - [ ] Export / Import
- [x] Views (represent a table)
  - [x] Add new view & Edit view configurations
  - [x] Data table with pagination
  - [x] Search
  - [x] Permissions (C,R,U,D)
  - [x] Terminology
  - [x] Selection of columns to display or search by
  - [x] Add new record / Edit record
  - [x] Edit record
  - [x] Connect existing view as sub views
  - [ ] Export data in various formats like: csv, dump
- [x] Custom SQL Queries
- [x] Subviews (represent a sub table)
- [x] Views relations
  - [x] Drill from view to view (subview)
  - [x] Column based tables relation (left join) 
- [x] View widgets (display aggragated data in the view)
  - [x] Add / Edit / Remove widgets
  - [x] Aggregation functions (AVG, SUM, MIN, MAX, COUNT)
  - [ ] Apply filters on widget data
- [x] View filters (build where clauses to filter the data)
  - [x] Add / Edit / Remove filter in each view
  - [x] One click apply / unapply on view data
  - [x] Simple & friendly interface to build where clauses
- [ ] Process manager (view running queries)
- [ ] Export / Import of all user accounts.
- [x] Themes
- [x] Log Console

### Databases
- [x] MySQL/MariaDB
- [x] PostgreSQL
- [x] SQLite (Limited support)
- [ ] MSSQL
- [ ] Oracle

## Download Binaries ![GitHub release](https://img.shields.io/github/release/garrylachman/ElectroCRUD.svg?style=for-the-badge)

* [Mac OSX](https://github.com/garrylachman/ElectroCRUD/releases/download/2.8.0/ElectroCRUD-2.8.0.dmg)
* [Linux](https://github.com/garrylachman/ElectroCRUD/releases/download/2.8.0/ElectroCRUD-2.8.0.AppImage)
* [Windows](https://github.com/garrylachman/ElectroCRUD/releases/download/2.8.0/ElectroCRUD.2.8.0.exe)

## Install via Package Managers
### Homebrew/brew (Mac OS/X)
`brew install --cask electrocrud`

## Download Sources
[ElectroCRUD on GitHub](https://github.com/garrylachman/ElectroCRUD)

## Videos
[![How to use](https://img.youtube.com/vi/pt2L4wKTwqA/0.jpg)](https://youtu.be/pt2L4wKTwqA?t=35s "How to use")
[![Review by David Mettler (ver 2.6.1)](https://img.youtube.com/vi/O6DcPi9ITw0/0.jpg)](https://www.youtube.com/watch?v=O6DcPi9ITw0 "Review by David Mettler (ver 2.6.1)")



## Screenshots
<img src="https://i.imgur.com/gV1QHYK.png" width="49.5%" style="float:left" /> <img width="49.5%" src="https://i.imgur.com/02DoYz1.png" style="float:left" />
<img src="https://i.imgur.com/CotNi4G.png" style="float:left" width="49.5%" /> <img width="49.5%" src="https://i.imgur.com/9MEQMbL.png" style="float:left" />
<img src="https://i.imgur.com/QzlYVJu.png" style="float:left" width="49.5%" /> <img width="49.5%" src="https://i.imgur.com/ypsowlS.png" style="float:left" />
<img src="https://i.imgur.com/IlKqhdV.png" style="float:left"/>
<img  src="https://i.imgur.com/I3IG1e4.png" style="float:left" />


## Build from source
`npm install`

### With codesign
`npm run electron:mac-win-linux`

### Without codesign
`CSC_IDENTITY_AUTO_DISCOVERY=false npm run electron:mac-win-linux`



![GitHub All Releases](https://img.shields.io/github/downloads/garrylachman/ElectroCRUD/total.svg?style=for-the-badge) 
![GitHub package.json version](https://img.shields.io/github/package-json/v/garrylachman/ElectroCRUD.svg?style=for-the-badge)
![Analytics](https://gabeacon.irvinlim.com/UA-77988987-1/github/master?flat&useReferer)
