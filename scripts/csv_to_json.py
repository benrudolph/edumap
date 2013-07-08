#!/usr/bin/env python

import sys
import os
import collections
import json
import collections

class Parser:

  HEADERS = ['COUNTRY',
  'PPG',
  'GOAL',
  'GROUP',
  'OBJECTIVE',
  'YEAR',
  'IND',
  'IND_BASELINE',
  'IND_ACTUAL',
  'IND_TARGET',
  'IND_MIDYEAR',
  'IND_YEAREND',
  'IND_STANDARD']

  def __init__(self, data):
    self.headers = data[0].split(',')
    self.data = data[1:]
    self.json_data = {}

  def parse(self):
    for row in self.data:
      line = row.lower().split(',')
      self.recurse(self.json_data, line, 0)


    import pdb; pdb.set_trace()
    with open('data.json', 'w') as outfile:
      json.dump(self.json_data, outfile)


  def recurse(self, container, line, i):
    if i == 7:
      return

    # Find corresponding country if it exists
    if self.HEADERS[i] + 'S' not in container:
      container[self.HEADERS[i] + 'S'] = []

    datum = None
    for d in container[self.HEADERS[i] + 'S']:
      if d[self.HEADERS[i]] == line[i]:
        datum = d

    if not datum:
      datum = {}
      datum[self.HEADERS[i]] = line[i]
      container[self.HEADERS[i] + 'S'].append(datum)

    self.recurse(datum, line, i+1)





def main():
  if len(sys.argv) < 2:
    print "Usage: python csv_to_json.py <input_data> [<output_file>]"
    sys.exit(0)

  f = open(sys.argv[1])

  p = Parser(f.readlines())
  p.parse()

  f.close()


if __name__ == "__main__":
  main()
