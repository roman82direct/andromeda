import type { Meta, StoryObj } from "@storybook/react";
import {IconButtonUI} from './index';

const meta: Meta<typeof IconButtonUI> = {
  component: IconButtonUI,
  title: 'Components/ui/IconButtonUI',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    onClick: { action: 'clicked'},
    isActive: {control: 'boolean'},
    iconActiveClass: {control: 'text'},
    iconClass: {control: 'text'},
    label: {control: 'text'},
    sizeIcon: {control: 'number'}
  }
};

export default meta;

type Story = StoryObj<typeof IconButtonUI>;

export const IconButtonClose: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'close',
    label: 'кнопка закрытия',
    sizeIcon: 20
  }
};

export const IconButtonComeIn: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'come-in',
    label: 'Вход в личный кабинет',
    sizeIcon: 20
  }
};


export const IconButtonSearch: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'search',
    label: 'поиск',
    sizeIcon: 20
  }
};

export const IconButtonNetwork: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'global',
    label: 'network',
    sizeIcon: 20
  }
};

export const IconButtonRead: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'read',
    label: 'кнопка reading',
    sizeIcon: 20
  }
};

export const IconButtonInfo: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'info',
    label: 'кнопка закрытия',
    sizeIcon: 20
  }
};

export const IconButtonClock: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'clock',
    label: 'иконка часы',
    sizeIcon: 20
  }
};


export const IconButtonLocationPoint: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'location',
    label: 'иконка локации',
    sizeIcon: 20
  }
};


export const IconButtonCart: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'cart',
    label: 'корзина товаров',
    sizeIcon: 20
  }
};


export const IconButtonLike: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'heart',
    label: 'кнопка для лайка',
    sizeIcon: 20
  }
};


export const IconButtonLiked: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'full-heart',
    label: 'лайкнутая кнопка',
    sizeIcon: 20
  }
};

//  чередование с сердцем

export const IconButtonUnLikedLikedTrue: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: false,
    iconActiveClass: 'full-heart',
    iconClass: 'heart',
    label: 'лайкнутая кнопка',
    sizeIcon: 20
  }
};

export const IconButtonUnLikedLikedFalse: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'full-heart',
    iconClass: 'heart',
    label: 'лайкнутая кнопка',
    sizeIcon: 20
  }
};

export const IconButtonProfile: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'profile',
    label: 'кнопка профиля',
    sizeIcon: 20
  }
};

export const IconButtonYoutube: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'youtube',
    label: 'ютуб',
    sizeIcon: 20
  }
};

export const IconButtonFacebook: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'facebook',
    label: 'facebook',
    sizeIcon: 20
  }
};

export const IconButtonVisa: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'visa',
    label: 'vise',
    sizeIcon: 20
  }
};

export const IconButtonInstagram: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'instagram',
    label: 'instagram',
    sizeIcon: 20
  }
};

export const IconButtonMastercard: Story = {
  args:{
    onClick:()=>{alert('вы кликнули по иконке')},
    isActive: true,
    iconActiveClass: 'mastercard',
    label: 'кнопка закрытия',
    sizeIcon: 20
  }
};



