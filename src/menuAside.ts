import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiPalette,
  mdiVuejs,
} from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    icon: mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/appraisal_reports/appraisal_reports-list',
    label: 'Appraisal reports',
    icon: mdiTable,
    permissions: 'READ_APPRAISAL_REPORTS',
  },
  {
    href: '/appraisal_summary/appraisal_summary-list',
    label: 'Appraisal summary',
    icon: mdiTable,
    permissions: 'READ_APPRAISAL_SUMMARY',
  },
  {
    href: '/features/features-list',
    label: 'Features',
    icon: mdiTable,
    permissions: 'READ_FEATURES',
  },
  {
    href: '/pdf_forms/pdf_forms-list',
    label: 'Pdf forms',
    icon: mdiTable,
    permissions: 'READ_PDF_FORMS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    icon: mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    icon: mdiTable,
    permissions: 'READ_PERMISSIONS',
  },

  {
    href: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    href: 'https://api.abiescreen.com/api-docs',
    label: 'Swagger API',
    icon: mdiAccountCircle,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
