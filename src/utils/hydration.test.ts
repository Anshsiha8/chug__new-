import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mlToFlOz,
  flOzToMl,
  formatVolume,
  calculateDailyTotal,
  calculatePercentage,
  getCalloutBadge,
  formatTime12h,
  getDateKey
} from './hydration.js';

test('mlToFlOz converts milliliters to fluid ounces accurately', () => {
  assert.equal(mlToFlOz(500), 16.9);
  assert.equal(mlToFlOz(250), 8.5);
  assert.equal(mlToFlOz(0), 0);
});

test('flOzToMl converts fluid ounces back to milliliters', () => {
  assert.equal(flOzToMl(16.9), 500);
  assert.equal(flOzToMl(0), 0);
});

test('formatVolume handles metric and imperial', () => {
  assert.equal(formatVolume(2500, 'ml'), '2,500 ML');
  assert.equal(formatVolume(500, 'fl_oz'), '16.9 FL OZ');
});

test('calculateDailyTotal sums drinks', () => {
  const drinks = [
    { id: '1', time: '08:00 AM', name: 'Water', ml: 300, tag: 'SIP', sub: '', icon: 'water_drop' },
    { id: '2', time: '11:00 AM', name: 'Tea', ml: 250, tag: 'TEA', sub: '', icon: 'tea' },
    { id: '3', time: '02:00 PM', name: 'Gym Flask', ml: 500, tag: 'WORKOUT', sub: '', icon: 'bolt' }
  ];
  assert.equal(calculateDailyTotal(drinks), 1050);
  assert.equal(calculateDailyTotal([]), 0);
});

test('calculatePercentage calculates correctly and clamps', () => {
  assert.equal(calculatePercentage(1250, 2500), 50);
  assert.equal(calculatePercentage(2500, 2500), 100);
  assert.equal(calculatePercentage(3000, 2500, true), 100);
  assert.equal(calculatePercentage(3000, 2500, false), 120);
  assert.equal(calculatePercentage(0, 2500), 0);
});

test('getCalloutBadge provides appropriate comic badges', () => {
  assert.equal(getCalloutBadge(100, 2500).title, 'NO CRUMBS!');
  assert.equal(getCalloutBadge(80, 2000).title, 'BOOM!');
  assert.equal(getCalloutBadge(50, 1250).title, 'NICE!');
  assert.equal(getCalloutBadge(10, 250).title, 'CHUG!');
  assert.equal(getCalloutBadge(0, 0).title, 'DRY!');
});

test('formatTime12h formats standard 24h times to AM/PM', () => {
  assert.equal(formatTime12h('14:30'), '02:30 PM');
  assert.equal(formatTime12h('07:45'), '07:45 AM');
  assert.equal(formatTime12h('00:15'), '12:15 AM');
  assert.equal(formatTime12h('12:00'), '12:00 PM');
});

test('getDateKey formats date properly with 0-indexed month', () => {
  const date = new Date(2026, 9, 24); // Month index 9 = October
  assert.equal(getDateKey(date), '2026-9-24');
});
