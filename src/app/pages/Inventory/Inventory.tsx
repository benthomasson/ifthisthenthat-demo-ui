import React, { FunctionComponent } from 'react';
import {
  Bullseye,
  PageSection,
  PageSectionVariants,
  Spinner,
  Text,
  TextContent,
} from '@patternfly/react-core';
import InventorySetting, {
  InventorySettingProps,
} from '@app/components/InventorySetting/InventorySetting';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getInventory, saveInventory } from '@app/api/rulebookApi';

const Inventory: FunctionComponent = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['inventory'],
    queryFn: getInventory,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (inventory: string) => {
      return saveInventory(inventory);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });

  const handleSaveInventory = (inventory: string) => {
    mutation.mutate(inventory, {
      onSettled: () => {
        mutation.reset();
      },
    });
  };

  const inventoryStatus: InventorySettingProps['status'] = mutation.isLoading ? 'saving' : 'ready';

  return (
    <>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <TextContent>
          <Text component="h1">Inventory</Text>
        </TextContent>
      </PageSection>
      <PageSection isFilled={true}>
        {isLoading && (
          <Bullseye>
            <Spinner isSVG aria-label="Loading" />
          </Bullseye>
        )}
        {isSuccess && (
          <InventorySetting
            value={data.inventory}
            onSave={handleSaveInventory}
            status={inventoryStatus}
          />
        )}
      </PageSection>
    </>
  );
};

export default Inventory;
