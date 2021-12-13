import { getMetadataArgsStorage } from 'typeorm';
import { RelationTypeInFunction } from 'typeorm/metadata/types/RelationTypeInFunction';
import { RelationType } from 'typeorm/metadata/types/RelationTypes';

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

interface GenericEntity {
  new (...args: any): any;
}

interface GenericObject {
  [key: string]: any;
}

interface DescriptionProps {
  subject: string;
  key: string;
  relation: RelationType;
  type: 'dateTime';
}

const metadataKey = Symbol('entity:description');

export function Description(description: AtLeast<DescriptionProps, 'subject'>) {
  return (TargetEntity: GenericObject, targetEntityKey: string) => {
    const descriptionList =
      Reflect.getMetadata(metadataKey, TargetEntity) ?? [];

    descriptionList.push({
      ...description,
      key: targetEntityKey,
    });

    Reflect.defineMetadata(metadataKey, descriptionList, TargetEntity);
  };
}

export function entityDescription(TargetEntity: GenericEntity) {
  const metadataDescriptions =
    Reflect.getMetadata(metadataKey, new TargetEntity()) ?? [];

  const { relations } = getMetadataArgsStorage();

  // insere informações extras a descrição
  return metadataDescriptions.map((metadata: any) => {
    const relation = relations.find(
      (relation: any) => metadata.key === relation.propertyName,
    );

    if (relation?.relationType) {
      Object.assign(metadata, {
        relation: relation.relationType,
      });
    }

    return metadata;
  });
}
