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
            <ul>
                <div className="li">
                    {!passwordErrorFirstSolved && <span>{translate('password.strength.tip.number.characters')}</span>}
                </div>
                <div className="li">
                    {!passwordErrorSecondSolved && <span>{translate('password.strength.tip.letter')}</span>}
                </div>
                <div className="li">
                    {!passwordErrorThirdSolved && <span>{translate('password.strength.tip.digit')}</span>}
                </div>
            </ul>
        </div>
    ) : null;

export const PasswordStrengthTip = React.memo(PasswordStrengthTipComponent);
