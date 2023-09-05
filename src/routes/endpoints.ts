import initializeDatabase from '../models/db';
import { FrutaModel } from '../models/fruta';
import { AgricultorModel } from '../models/agricultor';
import { ClienteModel } from '../models/cliente';
import { CampoModel } from '../models/campo';
import { CosechaModel } from '../models/cosecha';
import { agricultorSchema, clienteSchema, campoSchema, frutaSchema, variedadSchema, cosechaSchema } from '../utils/validationSchemas';
import { ErrorHandler, handleError } from '../utils/errorHandler';
import { Database } from 'sqlite';
import csvParser from 'csv-parser';
import express, { Request } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import { Readable } from 'stream';

const router = express.Router();

router.use(fileUpload());

let db: Database;
let agricultorModel: AgricultorModel;
let clienteModel: ClienteModel;
let campoModel: CampoModel;
let frutaModel: FrutaModel;
let cosechaModel: CosechaModel;

initializeDatabase()
  .then(database => {
    db = database;
    agricultorModel = new AgricultorModel(db);
    clienteModel = new ClienteModel(db);
    campoModel = new CampoModel(db);
    frutaModel = new FrutaModel(db);
    cosechaModel = new CosechaModel(db);
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
  });
  
  router.post('/upload-csv', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    const csvFile: any = req.files.csv;
  
    const results: any[] = [];
    
    const stream = new Readable({
      read() {
        this.push(csvFile.data);
        this.push(null);
      }
    });
  
    stream.pipe(csvParser({ separator: ';' }))
    .on('data', (data: any) => results.push(data))
    .on('end', async () => {
      const errors: any[] = [];

      for (const result of results) {
        try {
          const agricultorId = await agricultorModel.createAgricultor(result['Mail Agricultor'], result['Nombre Agricultor'], result['Apellido Agricultor']) as number;
          const clienteId = await clienteModel.createCliente(result['Mail Cliente'], result['Nombre Cliente'], result['Apellido Cliente']) as number;
          const campoId = await campoModel.createCampo(result['Nombre Campo'], result['Ubicación de Campo']) as number;
          const frutaId = await frutaModel.createFruta(result['Fruta Cosechada']) as number;
          const variedadId = await frutaModel.createVariedad(result['Variedad Cosechada'], frutaId) as number;
          await cosechaModel.createCosecha(campoId, variedadId, agricultorId, clienteId);
        } catch (error) {
          errors.push({row: result, error: (error as Error).message});
        }
      }

      if (errors.length > 0) {
        res.status(400).send({message: 'Se encontraron errores durante la importación', errors});
      } else {
        res.send('File uploaded and data imported successfully.');
      }
    });
});

  router.post('/agricultor', async (req, res) => {
    try {
      const validatedData = await agricultorSchema.validate(req.body);
      const agricultor = await agricultorModel.createAgricultor(validatedData.email, validatedData.nombre, validatedData.apellido);
      res.json(agricultor);
    } catch (error) {
      handleError(new ErrorHandler(400, (error as Error).message), res);
    }
  });

router.post('/cliente', async (req, res) => {
  try {
    const validatedData = await clienteSchema.validate(req.body);
    const cliente = await clienteModel.createCliente(validatedData.email, validatedData.nombre, validatedData.apellido);
    res.json(cliente);
  } catch (error) {
    handleError(new ErrorHandler(400, (error as Error).message), res);
  }
});

router.post('/campo', async (req, res) => {
  try {
    const validatedData = await campoSchema.validate(req.body);
    const campo = await campoModel.createCampo(validatedData.nombre, validatedData.ubicacion);
    res.json(campo);
  } catch (error) {
    handleError(new ErrorHandler(400, (error as Error).message), res);
  }
});

router.post('/fruta', async (req, res) => {
  try {
    const validatedData = await frutaSchema.validate(req.body);
    const fruta = await frutaModel.createFruta(validatedData.nombre);
    res.json(fruta);
  } catch (error) {
    handleError(new ErrorHandler(400, (error as Error).message), res);
  }
});

router.post('/variedad', async (req, res) => {
  try {
    const validatedData = await variedadSchema.validate(req.body);
    const variedad = await frutaModel.createVariedad(validatedData.nombre, validatedData.fruta_id);
    res.json(variedad);
  } catch (error) {
    handleError(new ErrorHandler(400, (error as Error).message), res);
  }
});

router.post('/cosecha', async (req, res) => {
  try {
    const validatedData = await cosechaSchema.validate(req.body);
    const cosecha = await cosechaModel.createCosecha(validatedData.campo_id, validatedData.variedad_id, validatedData.agricultor_id, validatedData.cliente_id);
    res.json(cosecha);
  } catch (error) {
    handleError(new ErrorHandler(400, (error as Error).message), res);
  }
});

export default router;
