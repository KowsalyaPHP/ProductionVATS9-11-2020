import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryLogsComponent } from "./category-logs.component";
import { CategoryLogsRoutes } from "./category-logs.routing";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CategoryLogsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],

  declarations: [CategoryLogsComponent],
  entryComponents: [CategoryLogsComponent]
})
export class CategoryLogsModule {}
