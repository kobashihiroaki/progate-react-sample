import React from 'react';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            email: '',
            hasEmailError: false,
            content: '',
            hasContentError: false
        };
    }
    handleEmailChange(event) {
        const inputValue = event.target.value;
        let isError;
        if (inputValue === '' || inputValue.length >= 50 || inputValue.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/) === null) {
            isError = true;
        } else {
            isError = false;
        }
        this.setState({
            email: inputValue,
            hasEmailError: isError
        })
    }
    handleContentChange(event) {
        const inputValue = event.target.value;
        const isEmpty = inputValue === '';
        this.setState({
            content: inputValue,
            hasContentError: isEmpty
        })
    }
    handleSubmit() {
        this.setState({isSubmitted: true});
    }

    render() {
        let emailErrorText;
        if (this.state.hasEmailError) {
            if (this.state.email === '') {
                emailErrorText = (
                    <p className='contact-message-error'>
                        メールアドレスを入力してください
                    </p>
                );
            } else if (this.state.email >= 50) {
                emailErrorText = (
                    <p className='contact-message-error'>
                        50文字以上入力できません
                    </p> 
                );
            }
        }
        // if (this.state.email.length >= 50) {
        //     emailErrorText = (
        //         <p className='contact-message-error'>
        //             50文字以上入力できません
        //         </p> 
        //     )
        // }
        // if (this.state.email.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/) === null) {
        //     emailErrorText = (
        //         <p className='contact-message-error'>
        //             正しいメールアドレスを入力してください
        //         </p> 
        //     )
        // }
        
        let contentErrorText;
        if (this.state.hasContentError) {
            contentErrorText = (
                <p className='contact-message-error'>
                    お問い合わせ内容を入力してください
                </p>
            )
        }

        let contactForm;
        if (this.state.isSubmitted) {
            contactForm = (
                <div className='contact-submit-message'>
                    送信完了
                </div>
            )
        } else {
            contactForm = (
                <form onSubmit={() => {this.handleSubmit()}}>
                    <p>メールアドレス（必須）</p>
                    <input 
                        value={this.state.email}
                        onChange={(event) => {this.handleEmailChange(event)}}
                    />
                    {emailErrorText}
                    <p>お問い合わせ内容（必須）</p>
                    <textarea 
                        value={this.state.content}
                        onChange={(event) => {this.handleContentChange(event)}}
                    />
                    {contentErrorText}
                    <input
                        type='submit'
                        value='送信'
                    />
                </form>
            )
        }

        return (
            <div className='contact-form'>
                {contactForm}
            </div>
        );
    }
}

export default ContactForm;