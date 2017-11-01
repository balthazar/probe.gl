import {Bench} from 'probe.gl';
import test from 'tape-catch';

import ParseColor from './utils/parse-color';
const {parseColor} = ParseColor;

const COLOR_STRING = '#FFEEBB';
const COLOR_STRING_4 = '#FFEEBBAO';
const COLOR_ARRAY = [222, 222, 222];
const COLOR_TYPED_ARRAY = new Uint8ClampedArray(COLOR_ARRAY);
const COLOR_ARRAY_4 = [222, 222, 222, 255];
const COLOR_TYPED_ARRAY_4 = new Uint8ClampedArray(COLOR_ARRAY_4);

test('Bench#import', t => {
  t.equals(typeof Bench, 'function',
    'Expected row logged');
  t.end();
});

test('Bench#constructor', t => {
  const suite = new Bench({id: 'test'});
  t.ok(suite instanceof Bench, 'suite created successfully');
  t.end();
});

test('Bench#run', t => {
  const suite =
    new Bench({
      id: 'test',
      log: t.comment.bind(t)
    })

    .group('Parse Color: from color array, write into target array')
    .add('color#parseColor (3 element array) -> Uint8ClampedArray target',
      () => new Uint8ClampedArray(4),
      target => parseColor(COLOR_ARRAY_4, target)
    )
    .add('color#parseColor (3 element typed array) -> Uint8ClampedArray target',
      () => new Uint8ClampedArray(4),
      target => parseColor(COLOR_TYPED_ARRAY, target)
    )
    .add('color#parseColor (4 element typed array) -> Uint8ClampedArray target',
      () => new Uint8ClampedArray(4),
      target => parseColor(COLOR_TYPED_ARRAY_4, target)
    )

    .add('color#parseColor (3 element array) -> array target',
      () => [],
      target => parseColor(COLOR_ARRAY, target)
    )
    .add('color#parseColor (4 element array) -> array target',
      () => [],
      target => parseColor(COLOR_ARRAY_4, target)
    )

    .group('Parse Color: From string')
    .add('color#parseColor (string) -> typed array target',
      () => new Uint8ClampedArray(4),
      target => parseColor(COLOR_STRING, target)
    )
    .add('color#parseColor (string with alpha) -> typed array target',
      () => new Uint8ClampedArray(4),
      target => parseColor(COLOR_STRING_4, target)
    )
    .add('color#parseColor (string) -> array target',
      () => [],
      target => parseColor(COLOR_STRING, target)
    )
    .add('color#parseColor (string with alpha) -> array target',
      () => [],
      target => parseColor(COLOR_STRING_4, target)
    )
    .add('color#parseColor (string), no target',
      () => parseColor(COLOR_STRING)
    )

    .group('Parse Color: from Array, no target')
    .add('color#parseColor (4 element array)',
      () => parseColor(COLOR_ARRAY_4)
    )
    .add('color#parseColor (4 element typed array)',
      () => parseColor(COLOR_TYPED_ARRAY_4)
    )
    .add('color#parseColor (3 element array)',
      () => parseColor(COLOR_ARRAY)
    )
    .add('color#parseColor (3 element typed array)',
      () => parseColor(COLOR_TYPED_ARRAY)
    )
    ;

  t.ok(suite instanceof Bench, 'suite created successfully');
  suite.run().then(
    () => t.end()
  );
});
