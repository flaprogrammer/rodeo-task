import mockdata from './mockdata.json';
import { Invoice, Project } from '../types/types';

const TIMEOUT = 600;

export function getProjects(): Promise<Project[]> {
  return resolveAfterTimeout(mockdata.projects);
}

export function getProjectById(id: string): Promise<Project> {
  return resolveAfterTimeout(mockdata.projects.filter((project) => project.id === id)[0]);
}

export function getInvoices(projectId: string): Promise<Invoice[]> {
  return resolveAfterTimeout(mockdata.invoices.filter((invoice) => invoice.projectId === projectId));
}

export function getInvoiceById(id: string): Promise<Invoice> {
  return resolveAfterTimeout(mockdata.invoices.filter((invoice) => invoice.id === id)[0]);
}

function resolveAfterTimeout<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, TIMEOUT);
  });
}