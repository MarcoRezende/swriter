import { RegisterOptions } from 'react-hook-form';
import { getMetadataArgsStorage } from 'typeorm';
import { RelationType } from 'typeorm/metadata/types/RelationTypes';
import { BaseEntity } from '../base_entity';

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

interface GenericEntity {
  new (...args: any): any;
}

interface GenericObject {
  [key: string]: any;
}

export interface DescriptionProps {
  subject: string;
  key?: string;
  relation?: RelationType;
  type?: 'dateTime' | 'text' | 'textarea' | 'select' | 'multi-select' | 'radio';
  selectKey?: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

const metadataKey = Symbol('entity:description');

export function Description(
  target: GenericObject,
  description: DescriptionProps,
) {
  return (TargetEntity: GenericObject, targetEntityKey: string) => {
    const descriptionList =
      Reflect.getMetadata(metadataKey, TargetEntity) ?? [];

    descriptionList.push({
      ...description,
      key: targetEntityKey,
      target,
      rules: {
        required: description.rules?.required ? 'Campo obrigatório' : false,
      },
    });

    Reflect.defineMetadata(metadataKey, descriptionList, TargetEntity);
  };
}

export function entityDescription(
  TargetEntity: GenericEntity,
): DescriptionProps[] {
  const metadataDescriptions =
    Reflect.getMetadata(metadataKey, new TargetEntity()) ?? [];

  const { relations } = getMetadataArgsStorage();

  // insere informações extras a descrição
  return metadataDescriptions.reduce((data: any[], metadata: any) => {
    const relation = relations.find(
      (relation: any) => metadata.key === relation.propertyName,
    );

    if (metadata.target === TargetEntity || metadata.target === BaseEntity) {
      if (relation?.relationType) {
        Object.assign(metadata, {
          relation: relation.relationType,
        });
      }

      data.push(metadata);
    }

    return data;
  }, []);
}
