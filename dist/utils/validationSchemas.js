"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cosechaSchema = exports.variedadSchema = exports.frutaSchema = exports.campoSchema = exports.clienteSchema = exports.agricultorSchema = void 0;
const yup = __importStar(require("yup"));
exports.agricultorSchema = yup.object().shape({
    email: yup.string().email().required(),
    nombre: yup.string().required(),
    apellido: yup.string().required(),
});
exports.clienteSchema = yup.object().shape({
    email: yup.string().email().required(),
    nombre: yup.string().required(),
    apellido: yup.string().required(),
});
exports.campoSchema = yup.object().shape({
    nombre: yup.string().required(),
    ubicacion: yup.string().required(),
});
exports.frutaSchema = yup.object().shape({
    nombre: yup.string().required(),
});
exports.variedadSchema = yup.object().shape({
    fruta_id: yup.number().required(),
    nombre: yup.string().required(),
});
exports.cosechaSchema = yup.object().shape({
    campo_id: yup.number().required(),
    variedad_id: yup.number().required(),
    agricultor_id: yup.number().required(),
    cliente_id: yup.number().required(),
});
