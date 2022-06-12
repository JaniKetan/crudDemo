import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  productDialog: boolean | undefined;
  product: any;
  products: any;
  selectedProducts: any;
  inventoryForm!: FormGroup;
  submitted: boolean | undefined;
  processOption: SelectItem[];
  gradeOption: SelectItem[];
  formOption: SelectItem[];
  productCategoryOption: SelectItem[];
  tableColumn: any;

  constructor(
    private messageService: MessageService,
    private crudService: CrudService,
    private confirmationService: ConfirmationService
  ) {
    this.processOption = [
      { label: 'Extract', value: 'EXTRACT' },
      { label: 'Drying & blend', value: 'DRYING' },
      { label: 'Dehydration', value: 'DEHYDRATION' },
    ];
    this.gradeOption = [
      { label: 'Organic', value: 'ORGANIC' },
      { label: 'Conventional', value: 'CONVENTIONAL' },
    ];
    this.formOption = [
      { label: 'Whole', value: 'WHOLE' },
      { label: 'Powder', value: 'POWDER' },
      { label: 'Viscous liquid', value: 'V_LIQUID' },
    ];

    this.productCategoryOption = [
      { label: 'Minerals', value: 'MIN' },
      { label: 'Vitamins', value: 'VIT' },
      { label: 'Protein', value: 'PRO' },
      { label: 'Dietary Supplements', value: 'D_S' },
      { label: 'Herb Powders', value: 'Herb' },
      { label: 'Veggie Powder', value: 'V_P' },
      { label: 'Fruit Powders', value: 'F_P' },
      { label: 'Seed Powders', value: 'S_P' },
      { label: 'Enzymes', value: 'ENZ' },
      { label: 'Food Colours', value: 'F_C' },
      { label: 'Food Flavours', value: 'F_F' },
      { label: 'Spices/Spices blend', value: 'SPICE' },
      { label: 'Amino Acids', value: 'A_A' },
      { label: 'Fibers', value: 'FIB' },
      { label: 'Essential Oils', value: 'E_O' },
      { label: 'ulsifiers', value: 'E' },
      { label: 'Raw Materials', value: 'R_M' },
      { label: 'Sweeteners', value: 'S_S' },
      { label: 'Preservatives', value: 'PRE' },
    ];
  }

  ngOnInit() {
    this.inventoryForm = new FormGroup({
      process: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      form: new FormControl('', [Validators.required]),
      pcategory: new FormControl('', [Validators.required]),
      productPicture: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
      productCode: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      documents: new FormControl('', [Validators.required]),
      shelfLife: new FormControl('', [Validators.required]),
      quantityavailable: new FormControl('', [Validators.required]),
      locations: new FormControl('', [Validators.required]),
      productColour: new FormControl('', [Validators.required]),
      botanicalName: new FormControl('', [Validators.required]),
      plantPartUsed: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
      packagingType: new FormControl('', [Validators.required]),
      solubility: new FormControl('', [Validators.required]),
      HSCode: new FormControl('', [Validators.required]),
      CASNumber: new FormControl('', [Validators.required]),
      countryofOrigin: new FormControl('', [Validators.required]),
      addedAdditivesOrpreservatives: new FormControl('', [Validators.required]),
      referenceStandard: new FormControl('', [Validators.required]),
      storageCondition: new FormControl('', [Validators.required]),
      bagSize: new FormControl('', [Validators.required]),
      productEndUses: new FormControl('', [Validators.required]),
      benefits: new FormControl('', [Validators.required]),
    });
    this.getAllRecord();
  }
  getAllRecord() {
    this.crudService.getCrudData().subscribe((data) => {
      if (data && data.length) {
        this.products = data;
        this.tableColumn = Object.keys(data[0]);
        this.tableColumn.push('Action');
      }
    });
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
    this.inventoryForm.reset();
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.crudService.setCrudData(this.inventoryForm.value).subscribe(
      (data) => {
        console.log(data);
        this.getAllRecord();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Somethings went wrong',
          life: 3000,
        });
      }
    );
    this.productDialog = false;
  }
}
