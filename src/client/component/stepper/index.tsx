import React from 'react';

import classnames from 'classnames/bind';
import styles from './styles/stepper.module.scss';
const cx = classnames.bind(styles);

export interface StepperProps {
    step: 0 | 1 | 2 | 3;
    // selectStep: (step: 0|1|2|3) => void;
    toStep1: () => void;
    toStep2: () => void;
    toStep3: () => void;
}
const Stepper: React.FC<StepperProps> = ({
    step,
    toStep1,
    toStep2,
    toStep3
}) => 
<ul
    className={cx('container')}
>
    <li
        className={cx('step', {
            0: true,
            selected: step === 0,
            clickable: step >= 0
        })}
        onClick={() => {
            if(step >= 0) {
                toStep1();
            };
        }}
    >STEP1: CSV불러오기</li>
    <li
        className={cx('step', {
            1: true,
            selected: step === 1,
            clickable: step >= 1
        })}
        onClick={() => {
            if(step >= 1) {
                toStep2();
            }
        }}
    >STEP2: 데이터 레이블 선택하기</li>
    <li
        className={cx('step', {
            2: true,
            selected: step === 2,
            clickable: step >= 2
        })}
        onClick={() => {
            if(step >= 2) {
                toStep3();
            };
        }}
    >STEP3: 플랏,레이블명 설정</li>
    <li
        className={cx('step', {
            3: true,
            selected: step === 3,
            clickable: step >= 3
        })}
    >STEP4: 플랏확인 후, 배포</li>
</ul>

export default Stepper;
