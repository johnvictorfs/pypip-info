# PyPip Info

[Devpost submission](https://devpost.com/software/pypip-info)

Made for the Hackaton [CatHacks 2020](https://cathacks-online-hackathon.devpost.com) from the University of Kentucky.

A GUI for [PyPi](https://pypi.org) for searching and getting condensed information on packages and their respective Repositories, running on Desktop (chrome) with [Flask + Flaskwebgui](https://github.com/ClimenteA/flaskwebgui). Frontend made with [Vue.js](https://vuejs.org/) and the Component Framework [Vuetify](https://vuetifyjs.com) for Vue.

---

## Motivation

Everytime I want to add a Python library to my project I usually search for it on Google, Github or PyPi, then I have to keep looking at different tabs for Github or PyPi and different parts of their pages to get the information I need to know if the library is good to use in a project or not, if it has active maintainers, if it has been updated recently, how many stars/forks/releases it has, if it has good documentation etc.

For this purpose me and my friend [Guilherme](https://github.com/johnvictorfs/pip-gui/commits?author=Guilherme-Vasconcelos) made this project to make this kind of search easier, by condensing most of the information necessary to know if a project is active. In the background it uses the PyPi's and GitHub's API to grab all the necessary information for displaying.

---

## Main Features

- General Information
  - Project License

- GitHub Information
  - Number of Stars
  - Number of Forks
  - Number of Contributors
  - Latest commit date

- PyPi Project Information
  - Project URLs
  - Python Versions
  - Number of Releases
  - Requirements
    - Number of Requirements
    - List of Requirements
  - Latest Release version and date

- Readme of project
  - Uses either GitHub's or PyPi Readme, whichever is available, since some projects have a GitHub Readme but not a PyPi one or vice-versa

---

## Images

![image](images/image3.png)

![image](images/image1.png)

![image](images/image2.png)

---

## Planned Features

- Installation of Libraries with pip directly via the app
  - File selection for python Version/Virtual Environment
  - Automatically look for available Python versions

- Add more information from non-github repositories (Gitlab, Bitbucket etc.)

- Short automatic analysis to decide if a Library is probably active or not

- Better looking Code Syntax Highlighting for project Readme

----

## Setup

- Install necessary Python packages with [poetry](https://github.com/python-poetry/poetry)
  - `poetry install`

- Install necessary Frontend packages with [yarn](https://yarnpkg.com/)
  - `cd frontend && yarn`

  - Build Frontend for production
    - `yarn build`

- Run Project
  - `poetry run main.py`
