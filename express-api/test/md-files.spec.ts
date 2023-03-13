import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../src/server';

function markdownToText(fileName: string): string {
  const folder = path.join(__dirname, 'md-files');
  return fs.readFileSync(folder + '/' + fileName, 'utf8');
}

describe('Test MD Files', () => {
  describe('Title Test', () => {
    test('should pass without any error', async () => {
      const text = markdownToText('base.md');
      const res = await request(app)
        .post('/')
        .send({ text: text, genC: false });

      expect(res.statusCode).toEqual(200);
      expect(typeof res.body.result).toBe('object');
      expect(res.body.error).toEqual(null);
    });

    describe('tcc config Test', () => {
      test('should return error when there is no tcc config', async () => {
        const text = markdownToText('test-no-tcc-config.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`'#' expected title TCC Config`);
      });
      test('should return error when having duplicate tcc config', async () => {
        const text = markdownToText('test-duplicate-tcc-config.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`'#' expected title Resumo`);
      });
      test('should return error when placing a configuration variable that does not exist', async () => {
        const text = markdownToText('test-variable-not-exist-tcc-config.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`'#' expected title Resumo`);
      });
      test('should pass when tcc config is empty', async () => {
        const text = markdownToText('test-empty-tcc-config.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
    });

    describe('Resume Test', () => {
      test('should return error when there is no resume', async () => {
        const text = markdownToText('test-no-resume.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`'#' expected title Resumo`);
      });
      test('should return error when having duplicate resume', async () => {
        const text = markdownToText('test-duplicate-resume.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`'#' expected title abstract`);
      });
      test('should pass when resume is empty', async () => {
        const text = markdownToText('test-empty-resume.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
    });

    describe('abstract Test', () => {
      test('should return error when there is no abstract', async () => {
        const text = markdownToText('test-no-abstract.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`'#' expected title abstract`);
      });
      test('should return error when having duplicate abstract', async () => {
        const text = markdownToText('test-duplicate-abstract.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`'#' expected title Introdução`);
      });
      test('should pass when abstract is empty', async () => {
        const text = markdownToText('test-empty-abstract.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
    });

    describe('Introduction Test', () => {
      test('should return error when there is no introduction', async () => {
        const text = markdownToText('test-no-introduction.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`'#' expected title Introdução`);
      });
      test('should return error when having duplicate introduction', async () => {
        const text = markdownToText('test-duplicate-introduction.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`'#' expected title`);
      });
      test('should pass when introduction is empty', async () => {
        const text = markdownToText('test-empty-introduction.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
    });

    describe('Development Test', () => {
      test('should return error when there is no development', async () => {
        const text = markdownToText('test-no-development.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`'#' expected title`);
      });
      test('should pass when development is empty', async () => {
        const text = markdownToText('test-empty-development.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
      test('should return an error when we have a title with more than 4 hashtags', async () => {
        const text = markdownToText('test-title-more-than-4-hashtags.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toEqual(`0 '#' a mais`);
      });
    });

    describe('Appendix Test', () => {
      test('should pass when there is no appendix', async () => {
        const text = markdownToText('test-no-appendix.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
      test('should return error when there is repeated title in appendix', async () => {
        const text = markdownToText('test-repeated-appendix.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toContain(
          '- Appendix has already been declared'
        );
      });
      test('should pass when appendix is empty', async () => {
        const text = markdownToText('test-empty-appendix.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
    });

    describe('Attachments Title', () => {
      test('should pass when there is no attachments', async () => {
        const text = markdownToText('test-no-attachments.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
      test('should return error when there is repeated title in attachments', async () => {
        const text = markdownToText('test-repeated-attachments.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toContain(
          '- Attachment has already been declared'
        );
      });
      test('should pass when attachments is empty', async () => {
        const text = markdownToText('test-empty-attachments.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
    });
  });

  describe('Component test', () => {
    describe('image', () => {
      test('should return error when repeating an image reference', async () => {
        const text = markdownToText('test-repeated-image.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toContain(
          `- reference has already been declared`
        );
      });
      test('should pass when loading an incomplete image', async () => {
        const text = markdownToText('test-incomplete-image.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
      test('should return an error when sending unsupported image types', async () => {
        const text = markdownToText('test-unsupported-image.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toContain(
          `expected to be contained in png,jpg,jpeg`
        );
      });
    });

    describe('italic', () => {
      test('should return error when loading an incomplete italic', async () => {
        const text = markdownToText('test-incomplete-italic.txt');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toContain(`'#' expected title abstract`);
      });
    });
    describe('bold', () => {
      test('should pass when loading an incomplete bold', async () => {
        const text = markdownToText('test-incomplete-bold.txt');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
    });

    describe('code', () => {
      test('should return error when repeating an code reference', async () => {
        const text = markdownToText('test-repeated-code.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(null);
        expect(res.body.error.message).toContain(
          `- reference has already been declared`
        );
      });
      test('should pass when loading an incomplete code', async () => {
        const text = markdownToText('test-incomplete-code.md');
        const res = await request(app)
          .post('/')
          .send({ text: text, genC: false });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body.result).toBe('object');
        expect(res.body.error).toEqual(null);
      });
    });
  });
});
