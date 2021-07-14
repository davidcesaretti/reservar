import express, { Response, Request, Router, NextFunction } from "express";

export const paginado = function (req, res, data: any) {
  const pageCount = Math.ceil(data.length / 8);
  let page = parseInt(req.query.page);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }

  return res.json({
    page: page,
    pageCount: pageCount,
    posts: data.slice(page * 8 - 8, page * 8),
  });
};
