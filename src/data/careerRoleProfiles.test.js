import test from 'node:test';
import assert from 'node:assert/strict';
import { careerRoleProfiles, getCareerRoleProfile } from './careerRoleProfiles.js';

const levels = ['nen-tang', 'so-cap', 'trung-cap', 'cao-cap', 'dan-dat'];

test('all listed career tracks have a complete occupational overview at every level', () => {
  let combinations = 0;
  for (const [major, tracks] of Object.entries(careerRoleProfiles)) {
    for (const track of Object.keys(tracks)) {
      for (const level of levels) {
        const profile = getCareerRoleProfile(major, track, level);
        assert.ok(profile?.summary?.length > 50, `${major}/${track}/${level} summary`);
        assert.ok(profile.scope?.length > 35, `${major}/${track}/${level} scope`);
        assert.ok(profile.responsibilities?.length >= 3, `${major}/${track}/${level} duties`);
        assert.ok(profile.skills?.length >= 3, `${major}/${track}/${level} skills`);
        assert.equal(profile.workAreas.length, 3, `${major}/${track}/${level} overview headings`);
        combinations++;
      }
    }
  }
  assert.equal(combinations, 110);
});

test('Lead Frontend covers team-wide technical responsibility rather than one exercise', () => {
  const profile = getCareerRoleProfile('dev', 'frontend', 'dan-dat');
  const duties = profile.responsibilities.join(' ').toLocaleLowerCase('vi');
  assert.match(duties, /kiến trúc frontend/);
  assert.match(duties, /hiệu năng/);
  assert.match(duties, /review code/);
  assert.match(duties, /phối hợp/);
  assert.match(profile.source.url, /^https:\/\/www\.onetonline\.org\//);
});
