import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [
    FormsModule,
    NgbHighlight,
    NgbPaginationModule,
    ReactiveFormsModule,
  ],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
})
export class DocumentComponent implements OnInit {
  constructor(private documentService: DocumentService) {}
  documents!: Document[];
  page: number = 1; // current page
  pageSize: number = 2; // number of record in a page
  collectionSize!: number; // total of record
  initPageSize: number = 2;
  initPage: number = 1;
  filter = new FormControl('', { nonNullable: true });
  myForm = new FormGroup({
    ID: new FormControl(''),
    title: new FormControl(''),
    type: new FormControl(''),
    state: new FormControl(''),
  });
  onSort({ column, direction }: any) {
    console.log(column, direction);
  }
  onSubmit() {
    console.log(this.myForm.value);
  }
  setPages(take: number, skip: number) {
    this.documentService.getDocuments(take, skip).subscribe((data: any) => {
      this.documents = data.data;
      this.pageSize = data.meta.take;
      this.collectionSize = data.meta.totalRecord;
    });
  }
  setPageSize(){
	this.page = 1; 
	this.setPages(this.pageSize, 0);

  }
  onPageChange() {
	this.setPages(this.pageSize, (this.page - 1) * this.pageSize);
  }
  ngOnInit() {
    this.setPages(this.initPageSize, 0);
  }
}
export type SortColumn = keyof Document | '';
export type SortDirection = 'asc' | 'desc' | '';
export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
interface Document {
  id: number;
  title: string;
  summary: string;
  type: number;
}
