import * as React from 'react';

export interface PasswordStrengthTipProps {
    passwordErrorFirstSolved: boolean;
    passwordErrorSecondSolved: boolean;
    passwordErrorThirdSolved: boolean;
    passwordPopUp: boolean;
    translate: (id: string) => string;
}

const PasswordStrengthTipComponent: React.FC<PasswordStrengthTipProps> = ({
    passwordErrorFirstSolved,
    passwordErrorSecondSolved,
    passwordErrorThirdSolved,
    translate,
}) =>
    !(passwordErrorFirstSolved && passwordErrorSecondSolved && passwordErrorThirdSolved) ? (
        <div className="text-xs grey-text">
            <p className="m-0">{translate('password.strength.tip.influence')}:</p>
            <ul className="p-0 style-none">
                <li>
                    {!passwordErrorFirstSolved && <span>{translate('password.strength.tip.number.characters')}</span>}
                </li>
                <li>{!passwordErrorSecondSolved && <span>{translate('password.strength.tip.letter')}</span>}</li>
                <li>{!passwordErrorThirdSolved && <span>{translate('password.strength.tip.digit')}</span>}</li>
            </ul>
        </div>
    ) : null;

export const PasswordStrengthTip = React.memo(PasswordStrengthTipComponent);
