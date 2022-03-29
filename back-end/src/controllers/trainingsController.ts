import { Request, Response } from "express";
import { MomentInput } from 'moment'
const puppeteer = require('puppeteer')
const fs_extra = require('fs-extra')
const data = require('./data.json')
const hbs = require('handlebars')
const path = require('path')
const moment = require('moment')
const fileSystem = require('fs')

const trainingsList = async (req: Request, res: Response) => {
   const list = data

   res.json(list)
}

const convertToPdf = async (req: Request, res: Response) => {

   try {

      const exampleData =
      {
         "trainigs": {
            "trainigName": "First training",
            "exercises": [
               {
                  "name": "Fist work",
                  "description": "Work hard",
                  "howLong": "15 minutes"
               },
               {
                  "name": "Second work",
                  "description": "Work low",
                  "howLong": "30 minutes"
               },
               {
                  "name": "Fist work",
                  "description": "Work low",
                  "howLong": "20 minutes"
               }
            ]
         }
      }

      await createPdf(exampleData);

      sendPdf(res);
   }
   catch (e) {
      console.error(e)
      res.status(404)
   }

}

module.exports = { trainingsList, convertToPdf }

async function createPdf(list: { trainigs: { trainigName: string; exercises: { name: string; description: string; howLong: string; }[]; }; }) {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();

   const content = await compile(list);

   await setPage(page, content, browser);
}

const compile = async (data: {}) => {

   const filePath = path.join(process.cwd(), 'src/controllers', 'template.hbs')
   const html = await fs_extra.readFile(filePath, 'utf-8')

   return hbs.compile(html)(data)
}

hbs.registerHelper('dataFormat', function (value: MomentInput, format: string) {
   return moment(value).format(format)
})

async function setPage(page: any, content: any, browser: any) {
   await page.setContent(content);
   await page.emulateMediaType('screen');
   await page.pdf({
      path: 'mypdf.pdf',
      format: 'A4',
      printBackground: true
   });

   await browser.close();
}

function sendPdf(res: Response<any, Record<string, any>>) {
   const fPath = path.join(process.cwd(), '', 'mypdf.pdf');
   const stat = fileSystem.statSync(fPath);

   res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': stat.size
   });

   const readStream = fileSystem.createReadStream(fPath);
   readStream.pipe(res);
}