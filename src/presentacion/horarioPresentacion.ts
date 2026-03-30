import { Request, Response } from "express";
import NHorario from "../negocios/horarioNegocio";

class PHorario {

    private day_of_week: string;
    private start_time: string;
    private end_time: string;

    constructor() {
        this.day_of_week = '';
        this.start_time = '';
        this.end_time = '';
    }

    messagePop = (req: Request, res: Response) => {
        const { message, type } = req.query;
        res.render('message-pop', {
            message: message || '',
            type: type || 'info'
        });
    }

    async getAll(req: Request, res: Response) {
        const horarios = await NHorario.getAll();
        return res.status(200).json(horarios);
    }

    async create(req: Request, res: Response) {
        const { day_of_week, start_time, end_time } = req.body;
        await NHorario.create({ day_of_week, start_time, end_time });
        return res.status(201).json({ message: "Horario creado correctamente" });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { day_of_week, start_time, end_time } = req.body;
        await NHorario.update(Number(id), { day_of_week, start_time, end_time });
        return res.status(200).json({ message: "Horario actualizado correctamente" });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await NHorario.delete(Number(id));
        return res.status(200).json({ message: "Horario eliminado correctamente" });
    }
}

export default new PHorario();