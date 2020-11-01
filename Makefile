#Copyright © 2020 Linus Vanas <linus@vanas.fi>
#SPDX-License-Identifier: MIT

JS = $(wildcard src/*.js)

.PHONY: all clean

parallel_overhead.js: $(JS)
	cat $^ > $@

all: parallel_overhead.js

clean:
	rm parallel_overhead.js
