function isEqual(item1, item2) {
  if (item1 instanceof Array && item2 instanceof Array) {
    // eslint-disable-next-line
    return isArrayEqual(item1, item2);
  }

  if (typeof item1 === 'object' && typeof item2 === 'object') {
    // eslint-disable-next-line
    return isObjectEqual(item1, item2);
  }

  return item1 === item2;
}

function isObjectEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const inObj2 = keys2.filter(k => isEqual(obj2[k], obj1[key]))[0];
    if (!inObj2) {
      return false;
    }
  }

  for (const key of keys2) {
    const inObj1 = keys1.filter(k => isEqual(obj1[k], obj2[key]))[0];
    if (!inObj1) {
      return false;
    }
  }

  return true;
}

function isArrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (const elm of arr1) {
    const inArr2 = arr2.filter(it => isEqual(it, elm));
    if (!inArr2[0]) {
      return false;
    }
  }

  for (const elm of arr2) {
    const inArr1 = arr1.filter(it => isEqual(it, elm));
    if (!inArr1[0]) {
      return false;
    }
  }

  return true;
}

function Wrapper(anything) {
  return {
    toEqual(thing) {
      if (anything === thing) {
        return;
      }

      /* eslint-disable */
      console.group('Test failed');
      console.log('Exepected:', thing);
      console.log('Actual:', anything);
      console.groupEnd();
      /* eslint-enable */

      throw new Error(`${anything} is not equal to ${thing}`);
    },

    valueEqual(thing) {
      // eslint-disable-next-line
      if (isEqual(thing, anything)) {
        return;
      }

      /* eslint-disable */
      console.group('Test failed');
      console.log('Exepected:', thing);
      console.log('Actual:', anything);
      console.groupEnd();
      /* eslint-enable */

      throw new Error(`value of ${anything} is not equal to ${thing}`);
    },
  };
}

export const expect = (thing) => new Wrapper(thing);

// eslint-disable-next-line
export const log = (...args) => console.log.apply(console, args);

// expect(
//   isEqual([1, 2], [2, 1])
// ).toEqual(true);

// expect(
//   isEqual([2, 2], [2, 1])
// ).toEqual(false);

// expect(
//   isEqual({ a: 1, b: 2 }, { b: 1, a: 2 })
// ).toEqual(true);

// expect(
//   isEqual({ a: 2, b: 2, k: 1 }, { b: 1, a: 2 })
// ).toEqual(false);
