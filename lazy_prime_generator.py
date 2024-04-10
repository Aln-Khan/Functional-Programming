import math

def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(math.sqrt(num)) + 1):
        if num % i == 0:
            return False
    
    return True

def lazy_prime_generator():
    num = 2
    while True:
        if is_prime(num):
            yield num
        num += 1

prime_generate = lazy_prime_generator()

for _ in range(10):
    print(next(prime_generate))