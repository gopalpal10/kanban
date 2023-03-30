import { Controller, Get, Post, UseGuards, Req, Res, UnauthorizedException, Body } from '@nestjs/common';
import type { Request, Response } from 'express';


/**
 * https://docs.nestjs.com/techniques/authentication
 */
@Controller('data')
export class TestController {

  @Get('test/:id')
  public logout(@Req() req: Request, @Res() res: Response): void {
    res.json({data:req.params.id})
  }

}
