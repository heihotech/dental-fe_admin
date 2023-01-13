export { default as Footer } from '../../components/Footer.vue'
export { default as HorizontalTopbar } from '../../components/Horizontal-topbar.vue'
export { default as Loading } from '../../components/Loading.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as PageHeader } from '../../components/Page-header.vue'
export { default as RightSidebar } from '../../components/Right-sidebar.vue'
export { default as Sidebar } from '../../components/Sidebar.vue'
export { default as Topbar } from '../../components/Topbar.vue'
export { default as HorizontalMenu } from '../../components/horizontal-menu.js'
export { default as Menu } from '../../components/menu.js'
export { default as Activity } from '../../components/widgets/Activity.vue'
export { default as SalesAnalytics } from '../../components/widgets/Sales-analytics.vue'
export { default as SellingProduct } from '../../components/widgets/Selling-product.vue'
export { default as SocialSource } from '../../components/widgets/Social-source.vue'
export { default as Stat } from '../../components/widgets/Stat.vue'
export { default as TopUsers } from '../../components/widgets/Top-users.vue'
export { default as BookOrderTable } from '../../components/tables/book-order-table.vue'
export { default as DoctorTable } from '../../components/tables/doctor-table.vue'
export { default as PatientTable } from '../../components/tables/patient-table.vue'
export { default as CreateBookOrdersModal } from '../../components/modals/book-orders/Create-book-orders-modal.vue'
export { default as DeleteBookOrdersModal } from '../../components/modals/book-orders/Delete-book-orders-modal.vue'
export { default as DetailBookOrdersModal } from '../../components/modals/book-orders/Detail-book-orders-modal.vue'
export { default as EditBookOrdersModal } from '../../components/modals/book-orders/Edit-book-orders-modal.vue'
export { default as EvaluateBookOrdersModal } from '../../components/modals/book-orders/Evaluate-book-orders-modal.vue'
export { default as RestoreBookOrdersModal } from '../../components/modals/book-orders/Restore-book-orders-modal.vue'
export { default as ValidateBookOrdersModal } from '../../components/modals/book-orders/Validate-book-orders-modal.vue'
export { default as CreateDoctorsModal } from '../../components/modals/doctors/Create-doctors-modal.vue'
export { default as DeleteDoctorsModal } from '../../components/modals/doctors/Delete-doctors-modal.vue'
export { default as DetailDoctorsModal } from '../../components/modals/doctors/Detail-doctors-modal.vue'
export { default as EditDoctorsModal } from '../../components/modals/doctors/Edit-doctors-modal.vue'
export { default as RestoreDoctorsModal } from '../../components/modals/doctors/Restore-doctors-modal.vue'
export { default as CreatePatientsModal } from '../../components/modals/patients/Create-patients-modal.vue'
export { default as DeletePatientsModal } from '../../components/modals/patients/Delete-patients-modal.vue'
export { default as DetailPatientsModal } from '../../components/modals/patients/Detail-patients-modal.vue'
export { default as EditPatientsModal } from '../../components/modals/patients/Edit-patients-modal.vue'
export { default as RestorePatientsModal } from '../../components/modals/patients/Restore-patients-modal.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
