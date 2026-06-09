output "ec2_instance_public_ip" {
    value = {
        for name , instance in aws_instance.my_instance: name => instance.public_ip
    }
}

output "ec2_instance_private_ip" {
    value = {
       for name , instance in aws_instance.my_instance: name => instance.private_ip 
    }
}

output "env" {
    value = var.env
}

output "region" {
    value = var.aws_region
}