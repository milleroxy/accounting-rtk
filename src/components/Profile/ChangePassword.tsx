import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {changePassword} from "../../features/api/accountApi.ts";

interface Props {
    close: () => void;
}


const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleClickClear = () => {
        setNewPassword('');
        setConfirmPassword('');
        setOldPassword('')
    };

    const handleClickSave =() => {

        if(confirmPassword === newPassword) {
            dispatch(changePassword([newPassword, oldPassword]))
            alert('Save new Password')
        }
        else{
            alert('new password and confirm new password are different')
        }
        close();
    }

    return (
        <>
            <label>Old password:
                <input
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    type="password"/>
            </label>
            <label>New Password:
                <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    type="password"/>
            </label>
            <label>Confirm Password:
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="Confirm password"/>
            </label>

            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default ChangePassword;