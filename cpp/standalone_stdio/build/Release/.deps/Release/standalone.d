cmd_Release/standalone := g++ -pthread -rdynamic -m64  -o Release/standalone -Wl,--start-group ./Release/obj.target/standalone/../prime4standalone/prime_sieve.o ./Release/obj.target/standalone/main.o -Wl,--end-group 