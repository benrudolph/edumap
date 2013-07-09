#!/usr/bin/env python

import sys
import os
import collections
import json
import collections

class Parser:

  # first value is name of field, second is if it's nested
  HEADERS = [
    ('country', True),
    ('ppg', True),
    ('objective', True),
    ('year', True),
    ('olbudget_impact', False),
    ('aolbudget_impact', False),
    ('compbudget_impact', False),
    ('indicator_impact', False),
    ('baseline', False),
    ('oltarget', False),
    ('optarget', False),
    ('myr', False),
    ('yer', False),
    ('standard', False),
    ('output', False),
    ('olbudget_perf', False),
    ('aolbudget_perf', False),
    ('compbudget_perf', False),
    ('indicator_perf', False),
    ('oltarget_perf', False),
    ('optarget_perf', False),
    ('myr_perf', False),
    ('yer_perf', False)
  ]

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
    if i >= len(self.HEADERS):
      return

    # Find corresponding country if it exists
    if self.HEADERS[i][0] + 's' not in container and self.HEADERS[i][1]:
      container[self.HEADERS[i][0] + 's'] = []
    elif not self.HEADERS[i][1]:
      container[self.HEADERS[i][0]] = line[i].strip().strip('"')
      self.recurse(container, line, i+1)
      return

    datum = None
    for d in container[self.HEADERS[i][0] + 's']:
      if d[self.HEADERS[i][0]] == line[i]:
        datum = d

    if not datum:
      datum = {}
      print line
      print i
      datum[self.HEADERS[i][0]] = line[i].strip().strip('"')
      container[self.HEADERS[i][0] + 's'].append(datum)

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
