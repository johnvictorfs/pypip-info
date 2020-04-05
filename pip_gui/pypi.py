from typing import Dict, Tuple, Optional
import json

from bs4 import BeautifulSoup
import requests


try:
    with open('config.json') as f:
        config = json.load(f)

except FileNotFoundError:
    config = {
        "username": "",
        "password": ""
    }


def search_pypi(query: str):
    url = f'https://pypi.org/search/?q={query}'

    r = requests.get(url)

    soup = BeautifulSoup(r.text, 'lxml')

    packages = []

    for package in soup.find_all('a', attrs={'class': 'package-snippet'}):
        name = package.find('span', attrs={'class': 'package-snippet__name'})
        version = package.find('span', attrs={'class': 'package-snippet__version'})
        description = package.find('p', attrs={'class': 'package-snippet__description'})

        packages.append({
            'name': name.text,
            'version': version.text,
            'description': description.text if description else None,
            # TODO: Change this URL to the local python API
            'url': f'http://pypi.python.org/pypi/{name.text}/json',
        })

    return packages


def find_license(array: list):
    for i, element in enumerate(array):
        if 'LICENSE' in element.upper():
            if 'OSI APPROVED' in element.upper():
                return array[i].split(' :: ')[2]
            else:
                return 'LICENSE NOT RECOGNIZED'
    return 'NO LICENSE'


def find_python_versions(array: list):
    if not array:
        return []

    new_list = []
    new_new_list = []
    for i, element in enumerate(array):
        if element[-1:int(str(element.find(':')).replace('.', '')):-1][0].isdigit():
            new_list.append(element[-1:int(str(element.find(':')).replace('.', '')):-1][0:3])
    for i, element in enumerate(new_list):
        if element[-1] == ':':
            new_new_list.append(new_list[i][0:-2])
        else:
            new_new_list.append(new_list[i][::-1])
    return new_new_list


def generate_project_urls_dict(urls: dict):
    new_urls = []
    if not urls:
        return []
    for key, value in urls.items():
        new_urls.append({'name': key, 'url': value})
    return new_urls


def get_repository_type(urls: Dict[str, str]) -> Tuple[Optional[str], Optional[str]]:
    if not urls:
        return None, None

    url_list = urls.values()

    for url in url_list:
        if 'github' in url.lower():
            return ('GitHub', url)
        elif 'gitlab' in url.lower():
            return ('GitLab', url)
        elif 'bitbucket' in url.lower():
            return ('BitBucket', url)
    return None, None


def get_package(package_name: str):
    data = requests.get(f'http://pypi.python.org/pypi/{package_name}/json/').json()
    github_repo = None
    author_github = None
    repo_name_github = None
    data_gh = None
    gh_readme = None
    contributors = None

    if data['info'].get('project_urls'):
        for value in data['info']['project_urls'].values():
            if 'github' in value:
                try:
                    github_repo = value

                    author_github = github_repo.split('/')[3] if github_repo else None
                    repo_name_github = github_repo.split('/')[4] if github_repo else None

                    gh_r = requests.get(
                        f'https://api.github.com/repos/{author_github}/{repo_name_github}', auth=(config['username'], config['password']))
                    if gh_r.status_code == 200:
                        data_gh = gh_r.json()

                        contributors_r = requests.get(data_gh['contributors_url'], auth=(config['username'], config['password']))

                        if contributors_r.status_code == 200:
                            # Get number of contributors
                            contributors_data = contributors_r.json()
                            contributors = len(contributors_data)

                        default_branch = data_gh.get('default_branch')

                        gh_readme_request = requests.get(
                            f'https://raw.githubusercontent.com/{author_github}/{repo_name_github}/{default_branch}/README.md'
                        )
                        gh_readme = gh_readme_request.text if gh_readme_request.status_code == 200 else None
                    break  # Stop after first github request
                except Exception:
                    pass

    keywords = data['info'].get('keywords')

    last_update = list(data['releases'].keys())[-1]

    requirements = data['info'].get('requires_dist', [])

    # PyPi project url
    project_url = {
        'name': 'Project Page',
        'url': data['info'].get('project_url')
    }

    last_update_date = None
    if data['releases'].get(last_update):
        last_update_date = data['releases'][last_update][0].get('upload_time')

    repository_type, repository_url = get_repository_type(data['info'].get('project_urls'))

    print(repository_type, repository_url)

    parsed_data = {
        'name': package_name,
        'has_repository_data': bool(data_gh),
        'author': data['info'].get('author'),
        'contributors': contributors,
        'repository_type': repository_type,
        'repository_url': repository_url,
        'author_email': data['info'].get('author_email'),
        'keywords': keywords.split(',') if keywords else [],
        'requirements': len(requirements) if requirements else None,
        'requirements_list': requirements if requirements else [],
        'license': find_license(data['info']['classifiers']),
        'python_versions': find_python_versions(data['info'].get('classifiers')),  # classifiers
        'operating_systems': [],
        'number_releases': len(data['releases']),
        'description': data_gh['description'] if data_gh else None,
        'bugtrack_url': data['info']['bugtrack_url'],
        'stars': data_gh['stargazers_count'] if data_gh else None,
        'forks': data_gh['forks_count'] if data_gh else None,
        'open_issues': data_gh['open_issues_count'] if data_gh else None,
        'last_commit': data_gh['updated_at'] if data_gh else None,
        'last_update': last_update,  # Procurar na lista de releases, pegar a data do último release
        'last_update_date': last_update_date,
        'pypi_readme': data['info'].get('description'),
        'pypi_readme_type': data['info'].get('description_content_type'),
        'homepage_readme': gh_readme,
        'homepage_type': data_gh['homepage'] if data_gh else None,
        'homepage_url': data_gh['html_url'] if data_gh else None,
        'version': None,
        'releases': list(data['releases'].keys()),
        'project_urls': [project_url] + generate_project_urls_dict(data['info']['project_urls'])
    }

    return parsed_data


# TODO: se der tempo
# Pesquisar venvs na máquina do usuário
# Usuário pode selecionar python específico
# Usar pip pra instalar no python selecionado
# def install_package(package_name: str):
#     pass


if __name__ == '__main__':
    print(get_package('nyaacli'))
