import { Tabs } from '@/components/ui/tabs';

import Wizard from 'app/components/wizard/Wizard';

export default async function WizardPage() {
  return (
    <Tabs defaultValue="all">
      <Wizard />
    </Tabs>
  );
}
