from bs4 import BeautifulSoup
import requests


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
    for key, value in urls.items():
        new_urls.append({'name': key, 'url': value})
    return new_urls


def get_package(package_name: str):
    data = requests.get(f'http://pypi.python.org/pypi/{package_name}/json/').json()
    github_repo = None
    for value in data['info']['project_urls'].values():
        if 'github' in value:
            github_repo = value
    author_github = github_repo.split('/')[3]
    repo_name_github = github_repo.split('/')[4]
    data_gh = requests.get(f'https://api.github.com/repos/{author_github}/{repo_name_github}').json()

    parsed_data = {
        'name': package_name,
        'author': data['info']['author'],
        'author_email': data['info']['author_email'],
        'maintainers': data['info']['maintainer'].split(','),
        'keywords': data['info']['keywords'].split(','),
        'requirements': data['info']['requires_dist'],  # requires_dist
        'license': find_license(data['info']['classifiers']),
        'python_versions': find_python_versions(data['info']['classifiers']),  # classifiers
        'operating_systems': None,
        'description': data_gh['description'],
        'bugtrack_url': data['info']['bugtrack_url'],
        'stars': data_gh['stargazers_count'],
        'forks': data_gh['forks_count'],
        'open_issues': data_gh['open_issues_count'],
        'last_update': list(data['releases'].keys())[-1],  # Procurar na lista de releases, pegar a data do último release
        'last_commit': data_gh['updated_at'],
        'pypi_readme': data['info']['description'],
        # README do repo Git, se existir, github/gitlab etc.
        'homepage_readme': requests.get(f'https://raw.githubusercontent.com/{author_github}/{repo_name_github}/master/README.md').text,
        'homepage_type': data_gh['homepage'],
        'homepage_url': data_gh['html_url'],
        'version': None,
        'releases': list(data['releases'].keys()),
        'project_urls': generate_project_urls_dict(data['info']['project_urls'])
    }

    return parsed_data


# TODO: se der tempo
# Pesquisar venvs na máquina do usuário
# Usuário pode selecionar python específico
# Usar pip pra instalar no python selecionado
# def install_package(package_name: str):
#     pass


if __name__ == '__main__':
    print(get_package('nyaacli')['last_commit'])
