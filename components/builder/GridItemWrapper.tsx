'use client';

import HeadingItem from './items/HeadingItem';
import TextItem from './items/TextItem';
import ImageItem from './items/ImageItem';
import ButtonItem from './items/ButtonItem';
import ContainerItem from './items/ContainerItem';
import NavbarItem from './items/NavbarItem';
import HeaderItem from './items/HeaderItem';
import type { ComponentType, BaseComponentData } from '@/types';

interface GridItemWrapperProps {
  id: string;
  type: ComponentType;
  data: BaseComponentData;
  isPreview: boolean;
  isSelected: boolean;
  onUpdate: (id: string, newData: BaseComponentData) => void;
}

export default function GridItemWrapper({
  id,
  type,
  data,
  isPreview,
  isSelected,
  onUpdate,
}: GridItemWrapperProps) {
  const updateData = (newData: BaseComponentData) => onUpdate(id, newData);

  const renderComponent = () => {
    const props = { data, onUpdate: updateData, isPreview };

    switch (type) {
      case 'heading':
        return <HeadingItem {...props} data={data as any} onUpdate={updateData as any} />;
      case 'text':
        return <TextItem {...props} data={data as any} onUpdate={updateData as any} />;
      case 'image':
        return <ImageItem {...props} data={data as any} onUpdate={updateData as any} />;
      case 'button':
        return <ButtonItem {...props} data={data as any} onUpdate={updateData as any} />;
      case 'container':
        return <ContainerItem {...props} data={data as any} onUpdate={updateData as any} />;
      case 'navbar':
        return <NavbarItem {...props} data={data as any} onUpdate={updateData as any} />;
      case 'header':
        return <HeaderItem {...props} data={data as any} onUpdate={updateData as any} />;
      default:
        return <div>Unknown component</div>;
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow overflow-hidden">
      {renderComponent()}
    </div>
  );
}