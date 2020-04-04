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


def get_package(package_name: str):
    pass


# TODO: se der tempo
# Pesquisar venvs na máquina do usuário
# Usuário pode selecionar python específico
# Usar pip pra instalar no python selecionado
# def install_package(package_name: str):
#     pass


if __name__ == '__main__':
    print(get_package('nyaacli'))
    print(get_package('requests'))
