import random


def random_cage():
    sizes = [200, 250, 300, 350, 400]
    return f'https://www.placecage.com/c/{random.choice(sizes)}/{random.choice(sizes)}'
