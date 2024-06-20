import { Request, Response } from "express";
import { EmployeeService } from "../../business-layer/services/employee.service";
import { FamilyMemberService } from "../../business-layer/services/family_member.service";
import { BaseController } from "../common/base.controller";
import { MessagesKey } from "../../helpers/messages/messagesKey";
import db from "../../infrastructure/models";
import { generateEmployeeId } from "../../helpers/utils/generateId";

export class EmployeeController extends BaseController {
  private EmployeeService: EmployeeService;
  private FamilyMemberService: FamilyMemberService;

  constructor() {
    super();
    this.EmployeeService = new EmployeeService();
    this.FamilyMemberService = new FamilyMemberService();
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      await this.authMiddleware(req, res, "employee");

      const Employees = await this.EmployeeService.findAll(req);
      if (Employees && Employees.length > 0) {
        return this.sendSuccessGet(
          req,
          res,
          Employees,
          MessagesKey.SUCCESSGET,
          200
        );
      } else {
        return this.sendErrorNotFound(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  /**
   * Handles request to find a Employee by their primary key ID.
   */
  public async findByID(req: Request, res: Response): Promise<Response> {
    try {
      await this.authMiddleware(req, res, "employee");

      const id = parseInt(req.params.id);
      if (!id) {
        return this.sendErrorBadRequest(req, res);
      }
      const Employee = await this.EmployeeService.findByPKID(req, id);
      if (Employee) {
        return this.sendSuccessGet(
          req,
          res,
          Employee,
          MessagesKey.SUCCESSGETBYID,
          200,
          true
        );
      } else {
        return this.sendErrorNotFound(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async findAllWhiteCollar(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await this.authMiddleware(req, res, "employee");

      const Employees = await this.EmployeeService.where(
        req,
        {
          "$Position.type$": "White",
        },
        [
          {
            model: db.Position,
            attributes: ["type"],
          },
        ]
      );

      if (Employees && Employees.length > 0) {
        return this.sendSuccessGet(
          req,
          res,
          Employees,
          MessagesKey.SUCCESSGET,
          200
        );
      } else {
        return this.sendErrorNotFound(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async findAllBlueCollar(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await this.authMiddleware(req, res, "employee");

      const Employees = await this.EmployeeService.where(
        req,
        {
          "$Position.type$": "Blue",
        },
        [
          {
            model: db.Position,
            attributes: ["type"],
          },
        ]
      );

      if (Employees && Employees.length > 0) {
        return this.sendSuccessGet(
          req,
          res,
          Employees,
          MessagesKey.SUCCESSGET,
          200
        );
      } else {
        return this.sendErrorNotFound(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async findAllPemotong(req: Request, res: Response): Promise<Response> {
    try {
      await this.authMiddleware(req, res, "employee");

      const Employees = await this.EmployeeService.where(
        req,
        {
          "$Position.white_is_pemotong_bukpot$": true,
        },
        [
          {
            model: db.Position,
            attributes: ["white_is_pemotong_bukpot"],
          },
        ]
      );

      if (Employees && Employees.length > 0) {
        return this.sendSuccessGet(
          req,
          res,
          Employees,
          MessagesKey.SUCCESSGET,
          200
        );
      } else {
        return this.sendErrorNotFound(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  async getEmployeeAvailability(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      // await this.authMiddleware(req, res, 'employee');

      const { manSkilId, queryOrder } = req.body;

      if (!manSkilId) {
        return res.status(400).json({ message: "manSkilId is required" });
      }

      const availableEmploye =
        await this.EmployeeService.getEmployeeAvailability(
          req,
          manSkilId,
          queryOrder
        );

      if (availableEmploye && availableEmploye.length > 0) {
        return this.sendSuccessGet(
          req,
          res,
          availableEmploye,
          MessagesKey.SUCCESSGET,
          200
        );
      } else {
        return this.sendErrorNotFound(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      await this.authMiddleware(req, res, "employee");

      // req.body['pkid'] = generateEmployeeId();

      const result = await this.EmployeeService.create(req, req.body);

      if (typeof result !== "string")
        return this.sendSuccessCreate(
          req,
          res,
          result,
          result?.dataValues.pkid
        );

      return this.sendErrorCreation(req, res);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      await this.authMiddleware(req, res, "employee");

      const id = parseInt(req.params.id);
      const data = req.body;
      if (!id) {
        return this.sendErrorBadRequest(req, res);
      }
      const pr = await this.EmployeeService.update(req, id, data);
      if (pr) {
        return this.sendSuccessUpdate(req, res, pr, id);
      } else {
        return this.sendErrorNotFound(req, res);
      }
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async updatePTKPVerification(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await this.authMiddleware(req, res, "employee");

      const year = req.params.year;
      if (!year) {
        return this.sendErrorBadRequest(req, res);
      }

      const pr = await this.EmployeeService.updatePTKPVerification(req, year);
      return this.sendSuccessUpdate(req, res, pr);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.authMiddleware(req, res, "employee");

      const id = parseInt(req.params.id);
      if (!id) {
        return this.sendErrorBadRequest(req, res);
      }

      await this.FamilyMemberService.deleteFamilyMemberByEmployeeID(
        req,
        id
      ).then(async () => {
        await this.EmployeeService.delete(req, id);
      });

      return this.sendSuccessDelete(req, res);
    } catch (error) {
      return this.handleError(req, res, error, 500);
    }
  }
}
